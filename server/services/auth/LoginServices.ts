import { IUser } from '~/types/domain/IUser'
import { LoginRequest } from '~/types/web/login_request'
import { SessionRequest } from '~/types/web/session_request'
import { ILoginServices } from '~/server/services/auth/ILoginServices'
import { LoginRepository } from '~/server/repositories/auth/LoginRepository'
import { ErrorResponse } from '~/types/web/error_response'
import bcrypt from 'bcrypt'

export class LoginServices implements  ILoginServices {
    constructor(private readonly _loginRepository: LoginRepository) {
    }

    async showUser(request: LoginRequest): Promise<IUser|ErrorResponse> {
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

        return user!
    }

    async storeSessionUser(request: SessionRequest): Promise<void> {
    }

}