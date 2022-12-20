/** @format */

import { H3Event } from 'h3';
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault';
import { logoutServices } from '~/server/services/LogoutServices';

export async function logoutController(event: H3Event) {
  try {
    const authCookie = getCookie(event, 'access-token');

    const services = await logoutServices(authCookie!);

    setCookie(event, 'access-token', '', {
      maxAge: -1,
      sameSite: true,
      httpOnly: true,
    });

    setCookie(event, 'refresh-token', '', {
      maxAge: -1,
      sameSite: true,
      httpOnly: true,
    });

    return services;
  } catch (error: any) {
    console.log(error);
    return await sendDefaultErrorResponse(event, 'oops', 500, error);
  }
}
