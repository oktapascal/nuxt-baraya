import bcrypt from 'bcrypt';
import { LoginRequest } from '~/types/request/login';
import { InputValidation } from '~/types/inputValidation';
import { showUserRepo } from '~/server/repositories/UserRepo';

export async function validate(data: LoginRequest) {
  const errors = new Map<string, { message: string | undefined }>();

  for (const [key, value] of Object.entries(data)) {
    let val = await validateLogin(key, value);

    if (val.hasError) {
      errors.set(key, { message: val.errorMessage });
    }
  }

  return errors;
}

async function validateLogin(
  key: string,
  value: string
): Promise<InputValidation> {
  const check: InputValidation = {
    hasError: false,
    key,
    value,
  };

  if (key === 'username') {
    const username = await showUserRepo(value);

    if (!username) {
      check.hasError = true;
      check.errorMessage = 'Username tidak terdaftar';
    }
  }

  if (key === 'password') {
    const userData = await showUserRepo(value);
    if (userData) {
      const compare = await bcrypt.compare(value, userData.password);

      if (!compare) {
        check.hasError = true;
        check.errorMessage = 'Password yang dimasukkan tidak sesuai';
      }
    }
  }

  return check;
}
