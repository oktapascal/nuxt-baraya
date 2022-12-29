import {karyawan as Karyawan, PrismaClient, user as User} from "@prisma/client";
import {IProfileRepository} from "~/server/repositories/IProfileRepository";

type DataUser = (User & { karyawan: Karyawan | null })

export class ProfileRepository implements IProfileRepository {
    private readonly prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getDataUser(id_user: string): Promise<DataUser | null> {
        const user = this.prisma.user.findUnique({
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