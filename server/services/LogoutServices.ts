/** @format */

import { deleteSessionByAuthToken } from '~/server/repositories/SessionRepo';

export async function logoutServices(authToken: string) {
  await deleteSessionByAuthToken(authToken);
  useState('user').value = null;

  return true;
}
