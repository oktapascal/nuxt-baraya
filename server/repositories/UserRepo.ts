import prisma from '~/prisma/client';
import { IUser } from '~~/types/data/IUser';

export async function storeUserRepo(data: IUser) {
  const result = await prisma.user.create({
    data: {
      username: data.username,
      password: data.password,
      karyawan: {
        create: {
          kode_lokasi: data.kode_lokasi,
        },
      },
    },
    select: {
      id: true,
      username: true,
    },
  });

  return result;
}

export async function showUserRepo(username: string) {
  const result = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      karyawan: true,
    },
  });

  return result;
}
