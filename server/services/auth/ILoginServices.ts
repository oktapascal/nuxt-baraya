import { LoginRequest } from '~/types/web/login_request'
import { SessionRequest } from '~/types/web/session_request'
import { IUser } from "~/types/domain/IUser";
import { ErrorResponse } from '~/types/web/error_response'

export interface ILoginServices {
    showUser(request: LoginRequest): Promise<IUser|ErrorResponse>
    storeSessionUser(request: SessionRequest): Promise<void>
}