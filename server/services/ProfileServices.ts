import { IProfileServices } from '~/server/services/IProfileServices'
import { ProfileUserComplete, ProfileUserResume } from '~/types/web/profile_response'
import { ProfileRepository } from '~/server/repositories/ProfileRepository'

export class ProfileServices implements IProfileServices{
    constructor(private readonly _profileRepository: ProfileRepository) {
    }
    async getProfileResume(id_user: string): Promise<ProfileUserResume> {
        const user = await this._profileRepository.getDataUser(id_user)

        let response: ProfileUserResume
        response = {
            nik: user!.karyawan!.nik,
            foto: user!.karyawan!.foto
        }

        return response
    }

    async getProfileUserComplete(id_user: string): Promise<ProfileUserComplete> {
        const user = await this._profileRepository.getDataUser(id_user)

        let response: ProfileUserComplete
        response = {
            nik: user!.karyawan!.nik,
            foto: user!.karyawan!.foto,
            alamat: user!.karyawan!.alamat,
            email: user!.karyawan!.email,
            nama: user!.karyawan!.nama,
            no_telp: user!.karyawan!.no_telp
        }

        return response
    }

}