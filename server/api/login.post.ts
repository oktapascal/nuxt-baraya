import { H3Event } from 'h3';
import { loginController } from '~/server/controllers/LoginController';

export default defineEventHandler(async (event: H3Event) => {
  const response = await loginController(event);

  return { message: 'Login Success', data: response };
});
