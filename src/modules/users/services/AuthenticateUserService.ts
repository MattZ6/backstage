import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  access_token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'No registered user with this email',
        EnumStatusCode.NotFound
      );
    }

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new AppError(
        'Incorrect password',
        EnumStatusCode.UnprocessableEntity
      );
    }

    const { expires_in, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expires_in,
    });

    return { access_token: token };
  }
}

export default AuthenticateUserService;
