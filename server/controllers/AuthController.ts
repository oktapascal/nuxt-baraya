import { H3Event } from 'h3'
import { IAuthController } from '~/server/controllers/IAuthController'
import { AuthServices } from '~/server/services/AuthServices'
import LoginRequest from '~/utils/request/login'
import RegisterRequest from '~/utils/request/register'
import { ZodError } from 'zod'
import sendZodErrorResponse from '~/utils/responses/zodErrors'
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault'
import { ErrorResponse } from '~/types/web/error_response'
import { UserIDResponse } from '~/types/web/user_id_response'
import { SessionRequest } from '~/types/web/session_request'
import { generateAccessToken } from '~/utils/jwt'
import { UserRoleResponse } from '~/types/web/user_role_response'

export class AuthController implements  IAuthController {
    constructor(private readonly event: H3Event, private readonly _authService: AuthServices) {
    }
    async login(): Promise<void> {
        try {
            const request = await LoginRequest(this.event)

            const response = await this._authService.showUser(request)

            if((response as ErrorResponse).hasError) {
                return sendError(this.event, createError({ statusCode: 422, data: (response as ErrorResponse).error }));
            }

            const authToken = generateAccessToken(response as UserIDResponse)

            let sessionRequest: SessionRequest
            sessionRequest = {
                id_user: (response as UserIDResponse).id_user,
                authToken: authToken
            }

            await this._authService.storeSessionUser(sessionRequest)

            setCookie(this.event, 'access-token', authToken, {
                maxAge: 8 * 60 * 60, // 8 jam
                sameSite: true,
            });
        } catch (e:any) {
            if (e.data instanceof ZodError) {
                return await sendZodErrorResponse(this.event, e.data);
            }

            return await sendDefaultErrorResponse(this.event, 'oops', 500, e);
        }
    }

    async save(): Promise<void> {
        try {
            const request = await RegisterRequest(this.event)

            const response = await this._authService.register(request)

            if(response?.hasError) {
                return sendError(this.event, createError({ statusCode: 422, data: response?.error }));
            }
        } catch (e:any) {
            if (e.data instanceof ZodError) {
                return await sendZodErrorResponse(this.event, e.data);
            }

            return await sendDefaultErrorResponse(this.event, 'oops', 500, e);
        }
    }

    async logout(): Promise<void> {
        try {
            const authToken = getCookie(this.event, 'access-token')

            await this._authService.logout(authToken!)

            setCookie(this.event, 'access-token', '', {
                maxAge: -1,
                sameSite: true,
            });
        } catch (e:any) {
            return await sendDefaultErrorResponse(this.event, 'oops', 500, e);
        }
    }

    async getUserRoleLocation(): Promise<UserRoleResponse|null|void> {
        try {
            const authToken = getCookie(this.event, 'access-token')

            if(authToken == undefined) {
                return null
            }

            const userId = await this._authService.getUserBySession(authToken)

            if(userId === null) {
                return null
            }

            let user: UserRoleResponse
            user = await this._authService.getUserRoleLocation(userId.id_user)

            return user
        } catch (e: any) {
            return await sendDefaultErrorResponse(this.event, 'oops', 500, e);
        }
    }
}