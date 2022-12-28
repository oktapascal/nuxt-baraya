import {karyawan as Karyawan, PrismaClient, session as Session, user as User} from "@prisma/client";
import {IUser} from "~/types/domain/IUser";
import {ISession} from "~/types/domain/ISession";
import {IAuthRepository} from "~/server/repositories/IAuthRepository";

type DataUser = (User & { karyawan: Karyawan | null })

export class AuthRepository implements IAuthRepository {
    constructor(private readonly prisma: PrismaClient) {
    }

    async register(user: IUser): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id,
                username: user.username,
                password: user.password,
                role: user.role,
                karyawan: {
                    create: {
                        kode_lokasi: user.kode_lokasi!,
                    },
                },
            },
        });
    }

    async showUser(username: string): Promise<User | null> {
        let user: IUser | null;
        user = await this.prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        return user;
    }

    async storeSessionUser(session: ISession): Promise<void> {
        await this.prisma.session.create({
            data: {
                id_user: session.id_user,
                authToken: session.authToken,
            },
        });
    }

    async checkUsername(username: string): Promise<boolean> {
        const result = await this.prisma.user.count({
            where: {
                username: username,
            },
        });

        return result === 0;
    }

    async deleteSessionByAuthToken(authToken: string): Promise<void> {
        await this.prisma.session.update({
            data: {
                deletedAt: new Date().toISOString(),
            },
            where: {
                authToken: authToken,
            },
        });
    }

    async getUserBySession(authToken: string): Promise<Session | null> {
        const session = await this.prisma.session.findUnique({
            where: {
                authToken: authToken,
            },
        });

        return session;
    }

    async getUserRoleLocation(id_user: string): Promise<DataUser | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id_user,
            },
            include: {
                karyawan: true,
            },
        });

        return user;
    }
}