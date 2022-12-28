import {IProfileServices} from "~/server/services/IProfileServices";
import {ProfileUserComplete, ProfileUserResume} from "~/types/web/profile_response";
import {ProfileRepository} from "~/server/repositories/ProfileRepository";
import {H3Event, sendError} from "h3";
import isH3Error from "~/utils/errors/isH3Error";
import sendDefaultErrorResponse from "~/utils/responses/errorsDefault";

export class ProfileServices implements IProfileServices {
    protected errors = new Map<string, string>();

    constructor(private readonly _profileRepository: ProfileRepository) {
    }

    async getProfileResume(event: H3Event, id_user: string): Promise<ProfileUserResume | void> {
        try {
            const user = await this._profileRepository.getDataUser(id_user);

            if (user === null) {
                this.errors.set("message", "Data user tidak ditemukan");
                throw createError({
                    statusCode: 403,
                    statusMessage: "Forbidden",
                    data: JSON.stringify(Object.fromEntries(this.errors)),
                });
            }

            if (user.karyawan === null) {
                this.errors.set("message", "Data user tidak ditemukan");
                throw createError({
                    statusCode: 403,
                    statusMessage: "Forbidden",
                    data: JSON.stringify(Object.fromEntries(this.errors)),
                });
            }

            let response: ProfileUserResume;
            response = {
                nik: user.karyawan.nik,
                foto: user.karyawan.foto,
            };

            return response;
        } catch (err: unknown) {
            if (isH3Error(err)) {
                return sendError(event, err);
            }

            return await sendDefaultErrorResponse(event, "oops", 500, err);
        }
    }

    async getProfileUserComplete(event: H3Event, id_user: string): Promise<ProfileUserComplete | void> {
        try {
            const user = await this._profileRepository.getDataUser(id_user);

            if (user === null) {
                this.errors.set("message", "Data user tidak ditemukan");
                throw createError({
                    statusCode: 403,
                    statusMessage: "Forbidden",
                    data: JSON.stringify(Object.fromEntries(this.errors)),
                });
            }

            if (user.karyawan === null) {
                this.errors.set("message", "Data user tidak ditemukan");
                throw createError({
                    statusCode: 403,
                    statusMessage: "Forbidden",
                    data: JSON.stringify(Object.fromEntries(this.errors)),
                });
            }

            let response: ProfileUserComplete;
            response = {
                nik: user.karyawan.nik,
                foto: user.karyawan.foto,
                alamat: user.karyawan.alamat,
                email: user.karyawan.email,
                nama: user.karyawan.nama,
                no_telp: user.karyawan.no_telp,
            };

            return response;
        } catch (err: unknown) {
            if (isH3Error(err)) {
                return sendError(event, err);
            }

            return await sendDefaultErrorResponse(event, "oops", 500, err);
        }
    }
}