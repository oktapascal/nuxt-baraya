import { LoginRequest } from '~/types/web/login_request'
import { SessionRequest } from '~/types/web/session_request'
import { UserIDResponse } from '~/types/web/user_id_response'
import { ErrorResponse } from '~/types/web/error_response'
import { RegisterRequest } from '~/types/web/register_request'
import { IAuthServices } from '~/server/services/IAuthServices'
import { AuthRepository } from '~/server/repositories/AuthRepository'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import {ISession} from "~/types/domain/ISession";
import {IUser} from "~/types/domain/IUser";

export class AuthServices implements IAuthServices {
    constructor(private readonly _authRepository: AuthRepository) {
    }
    async showUser(request: LoginRequest): Promise<UserIDResponse | ErrorResponse> {
        const errors = new Map<string, { message: string | undefined }>()
        const user = await this._authRepository.showUser(request.username)

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

        await this._authRepository.storeSessionUser(session)
    }

    async register(request: RegisterRequest): Promise<void | ErrorResponse> {
        const errors = new Map<string, { message: string | undefined }>()

        const isUsernameExist = await this._authRepository.checkUsername(request.username)

        if(!isUsernameExist) {
            errors.set('username', { message: 'Username yang sama sudah ada' })
        }

        if(errors.size > 0) {
            const errorResponse = JSON.stringify(Object.fromEntries(errors))
            return { hasError: true, error: errorResponse }
        }

        let password: string
        password = await bcrypt.hash(request.password, 10)
        request.password = password

        let id: string
        id = crypto.randomUUID()
        request.id = id

        const data: IUser = {
            id: request.id,
            username: request.username,
            password: request.password,
            kode_lokasi: request.kode_lokasi
        }

        await this._authRepository.register(data)
    }
}