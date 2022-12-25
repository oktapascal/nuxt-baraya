import { session as Session, user as User, karyawan as Karyawan } from '@prisma/client'
import { IUser } from '~/types/domain/IUser'
import { ISession } from '~/types/domain/ISession'

type DataUser = (User & { karyawan: Karyawan|null })

export interface IAuthRepository {
    register(user: IUser): Promise<void>
    checkUsername(username: string): Promise<boolean>
    showUser(username: string): Promise<User|null>
    storeSessionUser(session: ISession): Promise<void>
    deleteSessionByAuthToken(authToken: string): Promise<void>
    getUserBySession(authToken: string): Promise<Session|null>
    getUserRoleLocation(id_user: string): Promise<DataUser|null>
}