/** @format */

import { deleteSessionByAuthToken } from '~/server/repositories/SessionRepo';

export async function logoutServices(authToken: string) {
  await deleteSessionByAuthToken(authToken);

  return true;
}
