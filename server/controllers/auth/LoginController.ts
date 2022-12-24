import { H3Event } from 'h3'
import { ILoginController } from '~/server/controllers/auth/ILoginController'
import { LoginServices } from '~/server/services/auth/LoginServices'
import LoginRequest from '~/utils/request/login'
import { ZodError } from 'zod'
import sendZodErrorResponse from '~/utils/responses/zodErrors'
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault'
import { ErrorResponse } from '~/types/web/error_response'
import { UserIDResponse } from '~/types/web/user_id_response'
import { SessionRequest } from '~/types/web/session_request'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'

export class LoginController implements ILoginController {
    constructor(private readonly event: H3Event, private readonly _loginServices: LoginServices) {
    }
    async login(): Promise<void> {
        try {
            const request = await LoginRequest(this.event)

            const response = await this._loginServices.showUser(request)

            if((response as ErrorResponse).hasError) {
                return sendError(this.event, createError({ statusCode: 422, data: (response as ErrorResponse).error }));
            }

            const authToken = generateAccessToken(response as UserIDResponse)
            const refreshToken = generateRefreshToken(response as UserIDResponse)

            let sessionRequest: SessionRequest
            sessionRequest = {
                id_user: (response as UserIDResponse).id_user,
                authToken: authToken
            }

            await this._loginServices.storeSessionUser(sessionRequest)

            setCookie(this.event, 'access-token', authToken, {
                maxAge: 8 * 60 * 60, // 8 jam
                sameSite: true,
            });

            setCookie(this.event, 'refresh-token', refreshToken, {
                maxAge: 24 * 60 * 60, // 24 jam
                sameSite: true,
            });
        } catch (e:any) {
            console.log(e)
            if (e.data instanceof ZodError) {
                return await sendZodErrorResponse(this.event, e.data);
            }

            return await sendDefaultErrorResponse(this.event, 'oops', 500, e);
        }
    }
}