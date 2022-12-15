import { RegisterRequest } from '~~/types/request/register';
import { InputValidation } from '~/types/inputValidation';
import { showUserRepo } from '~/server/repositories/UserRepo';

export async function validate(data: RegisterRequest) {
  const errors = new Map<string, { message: string | undefined }>();

  for (const [key, value] of Object.entries(data)) {
    let val = await validateRegistration(key, value);

    if (val.hasError) {
      errors.set(key, { message: val.errorMessage });
    }
  }

  return errors;
}

async function validateRegistration(
  key: string,
  value: string
): Promise<InputValidation> {
  const check: InputValidation = {
    key,
    value,
    hasError: false,
  };

  if (key === 'username') {
    const username = await showUserRepo(value);

    if (username) {
      check.hasError = true;
      check.errorMessage = 'Username yang sama sudah ada';
    }
  }

  return check;
}
