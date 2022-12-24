import { IUser } from '~/types/domain/IUser'
import { ISession } from '~/types/domain/ISession'
export interface ILoginRepository {
    showUser(username: string): Promise<IUser|null>
    storeSessionUser(session: ISession): Promise<void>
}