/** @format */

import { getUserByAuthToken } from '~/server/repositories/SessionRepo';

export async function getUserBySession(authToken: string) {
  const session = await getUserByAuthToken(authToken);

  const data = {
    id: session?.id,
    kode_lokasi: session?.user.karyawan?.kode_lokasi,
  };

  return data;
}
