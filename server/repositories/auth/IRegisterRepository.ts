import { IUser } from '~/types/domain/IUser'
export interface IRegisterRepository {
    register(user: IUser): Promise<void>
    checkUsername(username: string): Promise<boolean>
}