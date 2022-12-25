import { IKaryawan } from '~/types/domain/IKaryawan'
import { ISession } from '~/types/domain/ISession'
export interface IUser {
    id: string
    username: string
    password: string
    role: string
    kode_lokasi?: string
    karyawan?: IKaryawan
    session?: ISession
}