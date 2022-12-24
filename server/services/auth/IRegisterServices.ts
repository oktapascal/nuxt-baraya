import { Register_request } from '~/types/web/register_request'
export interface IRegisterServices {
    register(request: Register_request): Promise<void>
}