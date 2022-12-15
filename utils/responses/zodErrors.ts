import { H3Event } from 'h3';
import { getMappingZodErrors } from '~/utils/errors/errorMapping';

export default async function sendZodErrorResponse(
  event: H3Event,
  errorData: any
) {
  const parsedError = getMappingZodErrors(errorData);

  return sendError(
    event,
    createError({
      statusCode: 422,
      statusMessage: 'Invalid Data Provided',
      data: parsedError,
    })
  );
}
