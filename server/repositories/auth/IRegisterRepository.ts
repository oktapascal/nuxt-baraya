import { IUser } from '~/types/domain/IUser'
export interface IRegisterRepository {
    register(user: IUser): Promise<any>
    checkUsername(username: string): Promise<boolean>
}