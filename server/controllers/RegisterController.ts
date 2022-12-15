import { H3Event } from 'h3';
import { ZodError } from 'zod';
import sendZodErrorResponse from '~/utils/responses/zodErrors';
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault';
import registerRequest from '~/utils/request/register/registerRequest';
import { registerService } from '~/server/services/RegisterServices';

export async function storeUserController(event: H3Event) {
  try {
    const data = await registerRequest(event);
    const services = await registerService(data);

    if (services?.hasErrors === true && services.errors) {
      const errors = JSON.stringify(Object.fromEntries(services.errors));

      return sendError(event, createError({ statusCode: 422, data: errors }));
    }

    return services;
  } catch (error: any) {
    if (error.data instanceof ZodError) {
      return await sendZodErrorResponse(event, error.data);
    }

    return await sendDefaultErrorResponse(event, 'oops', 500, error);
  }
}
