/** @format */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginRequest } from '~/types/request/login';
import { IUser } from '~/types/data/IUser';
import { ISession } from '~/types/data/ISession';
import { validate } from '~/utils/request/login/validator';
import { showUserRepo } from '~/server/repositories/UserRepo';
import { createSession } from '~/server/repositories/SessionRepo';

export async function loginService(data: LoginRequest) {
  const errors = await validate(data);

  if (errors.size > 0) {
    return { hasErrors: true, errors };
  }

  const userData = await showUserRepo(data.username);

  const compare = await bcrypt.compare(data.password, userData!.password);

  if (!compare) {
    const errors = new Map<string, { message: string | undefined }>();
    errors.set('password', { message: 'Password yang dimasukan tidak sesuai' });
    return {
      hasErrors: true,
      errors,
    };
  }

  const user: IUser = {
    id: userData!.id,
  };

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const dataSession: ISession = {
    authToken: accessToken,
    id_user: userData?.id!,
  };

  await createSession(dataSession);

  return { hasErrors: false, accessToken, refreshToken };
}

function generateAccessToken(payload: IUser) {
  const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

  const token = jwt.sign(payload, JWT_ACCESS_SECRET!, {
    expiresIn: '8h',
  });

  return token;
}

function generateRefreshToken(payload: IUser) {
  const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

  const token = jwt.sign(payload, JWT_ACCESS_SECRET!, {
    expiresIn: '24h',
  });

  return token;
}
