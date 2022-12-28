import {H3Event} from "h3";
import {IAuthController} from "~/server/controllers/IAuthController";
import {AuthServices} from "~/server/services/AuthServices";
import RegisterRequest from "~/utils/request/register";
import LoginRequest from "~/utils/request/login";
import isH3Error from "~/utils/errors/isH3Error";
import isErrorFromZod from "~/utils/errors/isErrorFromZod";
import sendZodErrorResponse from "~/utils/responses/zodErrors";
import sendDefaultErrorResponse from "~/utils/responses/errorsDefault";
import {generateAccessToken} from "~/utils/jwt";
import {SessionRequest} from "~/types/web/session_request";
import {UserRoleResponse} from "~/types/web/user_response";

export class AuthController implements IAuthController {
    constructor(private readonly event: H3Event, private readonly _authService: AuthServices) {
    }

    async login(): Promise<void> {
        try {
            const request = await LoginRequest(this.event);

            const id_user = await this._authService.showUser(this.event, request);

            const authToken = generateAccessToken(id_user as string);

            let session: SessionRequest;
            session = {
                id_user: id_user as string,
                authToken: authToken,
            };

            await this._authService.storeSessionUser(this.event, session);

            setCookie(this.event, "access-token", authToken, {
                maxAge: 8 * 60 * 60, // 8 jam
                sameSite: true,
            });
        } catch (err: unknown) {
            if (isH3Error(err)) {
                if (isErrorFromZod(err.data)) {
                    return await sendZodErrorResponse(this.event, err.data);
                }

                return await sendDefaultErrorResponse(this.event, "oops", 500, err.data);
            }
        }
    }

    async save(): Promise<void> {
        try {
            const request = await RegisterRequest(this.event);

            await this._authService.register(this.event, request);
        } catch (err: unknown) {
            if (isH3Error(err)) {
                if (isErrorFromZod(err.data)) {
                    return await sendZodErrorResponse(this.event, err.data);
                }

                return await sendDefaultErrorResponse(this.event, "oops", 500, err.data);
            }
        }
    }

    async logout(): Promise<void> {
        try {
            const authToken = getCookie(this.event, "access-token");

            await this._authService.logout(this.event, authToken as string);

            setCookie(this.event, "access-token", "", {
                maxAge: -1,
                sameSite: true,
            });
        } catch (err: unknown) {
            if (isH3Error(err)) {
                if (isErrorFromZod(err.data)) {
                    return await sendZodErrorResponse(this.event, err.data);
                }

                return await sendDefaultErrorResponse(this.event, "oops", 500, err.data);
            }
        }
    }

    async getUserRoleLocation(): Promise<UserRoleResponse | null> {
        const authToken = getCookie(this.event, "access-token");

        if (authToken == undefined) {
            return null;
        }

        const user = await this._authService.getUserRoleLocation(this.event, authToken);

        if (user === null) {
            return null;
        }

        let data: UserRoleResponse;
        data = {
            role: user.role,
            kode_lokasi: user.kode_lokasi,
        };

        return data;
    }
}