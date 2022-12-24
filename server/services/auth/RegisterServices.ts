import { IUser } from '~/types/domain/IUser'
import { RegisterRequest } from '~/types/web/register_request'
import { IRegisterServices } from './IRegisterServices'
import { RegisterRepository } from '~/server/repositories/auth/RegisterRepository'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { ErrorResponse } from '~/types/web/error_response'

export class RegisterServices implements IRegisterServices {
    constructor(private readonly _registerRepository: RegisterRepository) {
    }

    async register(request: RegisterRequest): Promise<void|ErrorResponse> {
       const errors = new Map<string, { message: string | undefined }>();

        const isUsernameExist = await this._registerRepository.checkUsername(request.username)

        if(!isUsernameExist) {
            errors.set('username', { message: 'Username yang sama sudah ada' })
        }

        if(errors.size > 0) {
            const errorResponse = JSON.stringify(Object.fromEntries(errors))
            return { hasError: true, error: errorResponse }
        }

        let password: string;
        password = await bcrypt.hash(request.password, 10);
        request.password = password

        let id: string;
        id = crypto.randomUUID()
        request.id = id

        const data: IUser = {
            id: request.id,
            username: request.username,
            password: request.password,
            kode_lokasi: request.kode_lokasi
        }

        await this._registerRepository.register(data)
    }
}