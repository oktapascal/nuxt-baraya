import { H3Event } from 'h3';
import { getMappingError } from '~/utils/errors/errorMapping';

export default async function sendDefaultErrorResponse(
  event: H3Event,
  errorType: string = "oops",
  statusCode: number = 500,
  error: any
) {
  const parsedError = getMappingError(errorType, error);

  return sendError(
    event,
    createError({
      statusCode: statusCode,
      statusMessage: 'Invalid Data Provided',
      data: parsedError,
    })
  );
}
