import prisma from "~/prisma/client";
import {IProfileRepository} from "~/server/repositories/IProfileRepository";
import {karyawan as Karyawan, user as User} from "@prisma/client";

type DataUser = (User & { karyawan: Karyawan | null })

export class ProfileRepository implements IProfileRepository {
    async getDataUser(id_user: string): Promise<DataUser | null> {
        const user = prisma.user.findUnique({
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