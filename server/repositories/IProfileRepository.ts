import { user as User, karyawan as Karyawan } from '@prisma/client'

type DataUser = (User & { karyawan: Karyawan|null })

export interface IProfileRepository {
    getDataUser(id_user: string): Promise<DataUser|null>
}