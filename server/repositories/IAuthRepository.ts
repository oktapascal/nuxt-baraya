import { IUser } from '~/types/domain/IUser'
import { ISession } from '~/types/domain/ISession'

export interface IAuthRepository {
    register(user: IUser): Promise<void>
    checkUsername(username: string): Promise<boolean>
    showUser(username: string): Promise<IUser|null>
    storeSessionUser(session: ISession): Promise<void>
    deleteSessionByAuthToken(authToken: string): Promise<void>
}