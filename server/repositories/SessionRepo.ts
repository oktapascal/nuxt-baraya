/** @format */

import { ISession } from '~/types/data/ISession';
import prisma from '~/prisma/client';
import { user } from '@prisma/client';
import { getToday, getTimeNow } from '~/utils/helper';

export async function createSession(data: ISession) {
  return await prisma.session.create({
    data: {
      id_user: data.id_user,
      authToken: data.authToken,
    },
  });
}

export async function getSessionByAuthToken(authToken: string) {
  const userData: user = (await getUserByAuthToken(
    authToken
  )) as unknown as user;

  return { authToken, userData };
}

export async function getUserByAuthToken(authToken: string) {
  return prisma.session
    .findUnique({
      where: {
        authToken: authToken,
      },
    })
    .user();
}

export async function deleteSessionByAuthToken(authToken: string) {
  return prisma.session.update({
    data: {
      deletedAt: new Date().toISOString(),
    },
    where: {
      authToken: authToken,
    },
  });
}
