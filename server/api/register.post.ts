import { H3Event } from 'h3';
import { RegisterRepository } from '~/server/repositories/auth/RegisterRepository'
import { RegisterServices } from '~/server/services/auth/RegisterServices'
import { RegisterController } from '~/server/controllers/auth/RegisterController'
export default defineEventHandler(async (event: H3Event) => {
  const registerRepository = new RegisterRepository()
  const registerService = new RegisterServices(registerRepository)
  const registerController = new RegisterController(event, registerService)

  await registerController.save()

  return { message: 'User berhasil didaftarkan', status: true };
});
