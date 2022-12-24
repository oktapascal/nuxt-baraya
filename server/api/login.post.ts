/** @format */

import { H3Event } from 'h3';
import { LoginRepository } from '~/server/repositories/auth/LoginRepository'
import { LoginServices } from '~/server/services/auth/LoginServices'
import { LoginController } from '~/server/controllers/auth/LoginController'

export default defineEventHandler(async (event: H3Event) => {
  const loginRepository = new LoginRepository()
  const loginServices = new LoginServices(loginRepository)
  const loginController = new LoginController(event, loginServices)

  const response = loginController.login()

  // return { statusCode: 200, message: 'Login Success', data: response };
});
