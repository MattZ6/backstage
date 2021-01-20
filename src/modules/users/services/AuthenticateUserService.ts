import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import EnumStatusCode from '@shared/dtos/EnumStatusCode';

import IHashProvider, {
  HASH_PROVIDER_INDENTIFIER,
} from '@modules/users/providers/HashProvider/models/IHashProvider';

import IUsersRepository, {
  USERS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  access_token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject(USERS_REPOSITORY_INDENTIFIER)
    private usersRepository: IUsersRepository,
    @inject(HASH_PROVIDER_INDENTIFIER)
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'No registered user with this email',
        EnumStatusCode.NotFound
      );
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password_hash
    );

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
