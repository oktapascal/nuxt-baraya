import { IUser } from '~/types/data/IUser'

export interface ISession {
    authToken: string
    id_user: number
    user?: IUser
}