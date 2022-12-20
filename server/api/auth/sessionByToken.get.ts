/** @format */

import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const authToken = getCookie(event, 'access-token');

  if (!authToken) {
    return null;
  }
});
