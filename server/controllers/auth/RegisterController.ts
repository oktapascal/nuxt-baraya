import { H3Event } from 'h3'
import { IRegisterController } from './IRegisterController'
import { RegisterServices } from '~/server/services/auth/RegisterServices'
import RegisterRequest from '~/utils/request/register'
import { ZodError } from 'zod';
import sendZodErrorResponse from '~/utils/responses/zodErrors';
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault';
export class RegisterController implements IRegisterController {
    constructor(private readonly event: H3Event, private readonly _registerService: RegisterServices) {
    }
    async save(event: H3Event): Promise<void> {
        try {
            const request = await RegisterRequest(this.event)

            await this._registerService.register(request)
        } catch (e:any) {
            if (e.data instanceof ZodError) {
                return await sendZodErrorResponse(event, e.data);
            }

            return await sendDefaultErrorResponse(event, 'oops', 500, e);
        }
    }
}