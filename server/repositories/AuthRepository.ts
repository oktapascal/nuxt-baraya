import prisma from '~/prisma/client'
import { IUser } from '~/types/domain/IUser'
import { ISession } from '~/types/domain/ISession'
import { IAuthRepository } from '~/server/repositories/IAuthRepository'

export class AuthRepository implements IAuthRepository {
    async register(user: IUser): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id,
                username: user.username,
                password: user.password,
                karyawan: {
                    create: {
                        kode_lokasi: user.kode_lokasi!
                    }
                }
            }
        })
    }

    async showUser(username: string): Promise<IUser | null> {
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

    async checkUsername(username: string): Promise<boolean> {
        const result = await prisma.user.count({
            where: {
                username: username
            }
        })

        return result === 0
    }
}