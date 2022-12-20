/** @format */

import { H3Event } from 'h3';
import { getUserBySession } from '~/server/services/AuthServices';

export default defineEventHandler(async (event: H3Event) => {
  const authToken = getCookie(event, 'access-token');

  if (!authToken) {
    return null;
  }

  const user = await getUserBySession(authToken);

  return user;
});
