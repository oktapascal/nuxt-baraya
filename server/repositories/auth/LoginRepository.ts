import prisma from '~/prisma/client'
import { IUser } from '~/types/domain/IUser'
import { ISession } from '~/types/domain/ISession'
import { ILoginRepository } from '~/server/repositories/auth/ILoginRepository'

export class LoginRepository implements ILoginRepository{
    async showUser(username: string): Promise<IUser|null> {
        let user: IUser|null
        user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        return user
    }

    async storeSessionUser(session: ISession): Promise<void> {
        await prisma.session.create({
            data: {
                id_user: session.id_user,
                authToken: session.authToken,
            }
        })
    }
}