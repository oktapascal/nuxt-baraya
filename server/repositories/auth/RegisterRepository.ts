import prisma from '~/prisma/client'
import { IUser } from '~/types/domain/IUser'
import { IRegisterRepository } from './IRegisterRepository'
export class RegisterRepository implements  IRegisterRepository{
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

    async checkUsername(username: string): Promise<boolean> {
        const result = await prisma.user.count({
            where: {
                username: username
            }
        })

        return result === 0
    }
}