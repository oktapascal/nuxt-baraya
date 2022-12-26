import { LoginRequest } from '~/types/web/login_request'
import { SessionRequest } from '~/types/web/session_request'
import { UserIDResponse, UserRoleResponse } from '~/types/web/user_response'
import { ErrorResponse } from '~/types/web/error_response'
import { RegisterRequest } from '~/types/web/register_request'

export interface IAuthServices {
    showUser(request: LoginRequest): Promise<UserIDResponse|ErrorResponse>
    storeSessionUser(request: SessionRequest): Promise<void>
    register(request: RegisterRequest): Promise<void|ErrorResponse>
    logout(authToken: string): Promise<void>
    getUserBySession(authToken: string): Promise<UserIDResponse|null>
    getUserRoleLocation(id_user: string): Promise<UserRoleResponse>
}