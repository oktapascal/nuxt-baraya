import { H3Event } from 'h3'
import { IUser } from '~/types/domain/IUser'
import { Register_request } from '~/types/web/register_request'
import { IRegisterServices } from './IRegisterServices'
import { RegisterRepository } from '~/server/repositories/auth/RegisterRepository'
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class RegisterServices implements IRegisterServices {
    constructor(private readonly  event: H3Event, private readonly _registerRepo: RegisterRepository) {
    }

    async register(request: Register_request): Promise<void> {
        try {
            const errors = new Map<string, { message: string | undefined }>();

            const isUsernameExist = await this._registerRepo.checkUsername(request.username)

            if(!isUsernameExist) {
                errors.set('username', { message: 'Username yang sama sudah ada' })
            }

            if(errors.size > 0) {
                const errorResponse = JSON.stringify(Object.fromEntries(errors))
                return sendError(this.event, createError({ statusCode: 422, data: errorResponse }));
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

            await this._registerRepo.register(data)
        } catch (e: any) {
            return await sendDefaultErrorResponse(this.event, 'oops', 500, e);
        }
    }
}