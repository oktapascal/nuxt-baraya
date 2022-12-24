import { H3Event } from 'h3'
import { IRegisterController } from './IRegisterController'
import { RegisterServices } from '~/server/services/auth/RegisterServices'
import RegisterRequest from '~/utils/request/register'
import { ZodError } from 'zod'
import sendZodErrorResponse from '~/utils/responses/zodErrors'
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault'
export class RegisterController implements IRegisterController {
    constructor(private readonly event: H3Event, private readonly _registerService: RegisterServices) {
    }
    async save(): Promise<void> {
        try {
            const request = await RegisterRequest(this.event)

            const response = await this._registerService.register(request)

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
}