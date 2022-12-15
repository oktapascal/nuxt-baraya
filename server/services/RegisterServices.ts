import bcrypt from 'bcrypt';
import { RegisterRequest } from '~/types/request/register';
import { IUser } from '~/types/data/IUser';
import { validate } from '~/utils/request/register/validator';
import { storeUserRepo } from '~/server/repositories/UserRepo';

export async function registerService(data: RegisterRequest) {
  const errors = await validate(data);

  if (errors.size > 0) {
    return { hasErrors: true, errors };
  }

  const password = await bcrypt.hash(data.password, 10);

  const userData: IUser = {
    kode_lokasi: data.kode_lokasi,
    password: password,
    username: data.username,
  };

  const user = await storeUserRepo(userData);

  return { hasErrors: false, user };
}
