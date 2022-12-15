import { H3Event } from 'h3';
import { storeUserController } from '~~/server/controllers/RegisterController';

export default defineEventHandler(async (event: H3Event) => {
  const response = await storeUserController(event);

  return { message: 'User berhasil didaftarkan', data: response };
});
