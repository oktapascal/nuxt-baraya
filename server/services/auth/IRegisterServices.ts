import { RegisterRequest } from '~/types/web/register_request'
import { ErrorResponse } from '~/types/web/error_response'
export interface IRegisterServices {
    register(request: RegisterRequest): Promise<void|ErrorResponse>
}