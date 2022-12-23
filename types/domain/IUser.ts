import { IKaryawan } from './IKaryawan'
export interface IUser {
    id: string
    username: string
    password: string
    kode_lokasi: string
    karyawan?: IKaryawan
}