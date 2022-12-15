import { H3Event } from 'h3';
import { ZodError } from 'zod';
import sendZodErrorResponse from '~/utils/responses/zodErrors';
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault';
import loginRequest from '~/utils/request/login/loginRequest';
import { loginService } from '~/server/services/LoginServices';

export async function loginController(event: H3Event) {
  try {
    const data = await loginRequest(event);
    const services = await loginService(data);

    if (services?.hasErrors === true && services.errors) {
      const errors = JSON.stringify(Object.fromEntries(services.errors));

      return sendError(event, createError({ statusCode: 422, data: errors }));
    }

    setCookie(event, 'access-token', services.accessToken!, {
      httpOnly: true,
      maxAge: 8 * 60 * 60, // 8 jam
    });

    setCookie(event, 'refresh-token', services.refreshToken!, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 24 jam
    });

    return services;
  } catch (error: any) {
    if (error.data instanceof ZodError) {
      return await sendZodErrorResponse(event, error.data);
    }

    return await sendDefaultErrorResponse(event, 'oops', 500, error);
  }
}
