import {H3Event, sendError} from "h3";
import bcrypt from "bcrypt";
import {RegisterRequest} from "~/types/web/register_request";
import {IAuthServices} from "~/server/services/IAuthServices";
import {AuthRepository} from "~/server/repositories/AuthRepository";
import sendDefaultErrorResponse from "~/utils/responses/errorsDefault";
import {SessionRequest} from "~/types/web/session_request";
import {LoginRequest} from "~/types/web/login_request";
import isH3Error from "~/utils/errors/isH3Error";
import {ISession} from "~/types/domain/ISession";
import {UserRoleResponse} from "~/types/web/user_response";

export class AuthServices implements IAuthServices {
    protected errors = new Map<string, { message: string | undefined }>();

    constructor(private readonly _authRepository: AuthRepository) {
    }

    async register(event: H3Event, request: RegisterRequest): Promise<void> {
        try {
            const checkUsernameExists = await this._authRepository.checkUsername(request.username);

            if (!checkUsernameExists) {
                this.errors.set("username", {message: "Username sudah terdaftar"});
                throw createError({
                    statusCode: 422,
                    statusMessage: "Unprocessable Entity",
                    data: JSON.stringify(Object.fromEntries(this.errors)),
                });
            }
        } catch (err: unknown) {
            if (isH3Error(err)) {
                return sendError(event, err);
            }

            return await sendDefaultErrorResponse(event, "oops", 500, err);
        }
    }

    async storeSessionUser(event: H3Event, request: SessionRequest): Promise<void> {
        try {
            let session: ISession;
            session = {
                id_user: request.id_user,
                authToken: request.authToken,
            };

            await this._authRepository.storeSessionUser(session);
        } catch (err: unknown) {
            if (isH3Error(err)) {
                return sendError(event, err);
            }

            return await sendDefaultErrorResponse(event, "oops", 500, err);
        }
    }

    async showUser(event: H3Event, request: LoginRequest): Promise<string | void> {
        try {
            const user = await this._authRepository.showUser(request.username);

            if (user === null) {
                this.errors.set("username", {message: "Username tidak terdaftar"});
                throw createError({
                    statusCode: 422,
                    statusMessage: "Unprocessable Entity",
                    data: JSON.stringify(Object.fromEntries(this.errors)),
                });
            }

            let comparePassword: boolean;
            comparePassword = await bcrypt.compare(request.password, user.password);

            if (!comparePassword) {
                this.errors.set("password", {message: "Password tidak sesuai"});
                throw createError({
                    statusCode: 422,
                    statusMessage: "Unprocessable Entity",
                    data: JSON.stringify(Object.fromEntries(this.errors)),
                });
            }

            return user.id;
        } catch (err: unknown) {
            if (isH3Error(err)) {
                return sendError(event, err);
            }

            return await sendDefaultErrorResponse(event, "oops", 500, err);
        }
    }

    async getUserBySession(event: H3Event, authToken: string): Promise<string | null> {
        const user = await this._authRepository.getUserBySession(authToken);

        if (user === null) {
            return null;
        }

        return user.id_user;
    }

    async getUserRoleLocation(event: H3Event, id_user: string): Promise<UserRoleResponse | null> {
        const user = await this._authRepository.getUserRoleLocation(id_user);

        if (user === null) {
            return null;
        }

        if (user.karyawan === null) {
            return null;
        }

        let data: UserRoleResponse;
        data = {
            role: user.role,
            kode_lokasi: user.karyawan.kode_lokasi,
        };

        return data;
    }

    async logout(event: H3Event, authToken: string): Promise<void> {
        await this._authRepository.deleteSessionByAuthToken(authToken);
    }
}