import { LoginRequest } from '~/types/web/login_request'
import { SessionRequest } from '~/types/web/session_request'
import { ILoginServices } from '~/server/services/auth/ILoginServices'
import { LoginRepository } from '~/server/repositories/auth/LoginRepository'
import { ErrorResponse } from '~/types/web/error_response'
import { UserIDResponse } from '~/types/web/user_id_response'
import bcrypt from 'bcrypt'
import { ISession } from '~/types/domain/ISession';

export class LoginServices implements  ILoginServices {
    constructor(private readonly _loginRepository: LoginRepository) {
    }

    async showUser(request: LoginRequest): Promise<UserIDResponse|ErrorResponse> {
        const errors = new Map<string, { message: string | undefined }>()
        const user = await this._loginRepository.showUser(request.username)

        if(user === null) {
            errors.set('username', { message: 'Username tidak terdaftar' })
        }

        if(errors.size > 0) {
            const errorResponse = JSON.stringify(Object.fromEntries(errors))
            return { hasError: true, error: errorResponse }
        }

        let comparePassword: boolean
        comparePassword = await bcrypt.compare(request.password, user?.password!)

        if(!comparePassword) {
            errors.set('password', { message: 'Password yang dimasukkan salah' })
        }

        if(errors.size > 0) {
            const errorResponse = JSON.stringify(Object.fromEntries(errors))
            return { hasError: true, error: errorResponse }
        }

        let response: UserIDResponse
        response = {
            id_user: user?.id!
        }

        return response
    }

    async storeSessionUser(request: SessionRequest): Promise<void> {
        let session: ISession
        session = {
            id_user: request.id_user,
            authToken: request.authToken
        }

        await this._loginRepository.storeSessionUser(session)
    }

}