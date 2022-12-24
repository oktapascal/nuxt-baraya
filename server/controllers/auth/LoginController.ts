import { H3Event } from 'h3'
import { ILoginController } from '~/server/controllers/auth/ILoginController'
import { LoginServices } from '~/server/services/auth/LoginServices'
import LoginRequest from '~/utils/request/login'
import { ZodError } from 'zod'
import sendZodErrorResponse from '~/utils/responses/zodErrors'
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault'
import { ErrorResponse } from '~/types/web/error_response'

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
        } catch (e:any) {
            if (e.data instanceof ZodError) {
                return await sendZodErrorResponse(this.event, e.data);
            }

            return await sendDefaultErrorResponse(this.event, 'oops', 500, e);
        }
    }
}