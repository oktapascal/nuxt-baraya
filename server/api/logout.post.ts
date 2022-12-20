/** @format */

import { H3Event } from 'h3';
import { logoutController } from '~/server/controllers/LogoutController';

export default defineEventHandler(async (event: H3Event) => {
  const response = await logoutController(event);

  return { message: 'Logout success', data: response };
});
