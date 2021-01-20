import { inject, injectable } from 'tsyringe';
import { isAfter, addSeconds } from 'date-fns';

import AppError from '@shared/errors/AppError';
import EnumStatusCode from '@shared/dtos/EnumStatusCode';

import IUsersRepository, {
  USERS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUsersRepository';

import IUserTokensRepository, {
  USER_TOKENS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUserTokensRepository';

import IHashProvider, {
  HASH_PROVIDER_INDENTIFIER,
} from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject(USERS_REPOSITORY_INDENTIFIER)
    private usersRepository: IUsersRepository,

    @inject(USER_TOKENS_REPOSITORY_INDENTIFIER)
    private userTokensRepository: IUserTokensRepository,

    @inject(HASH_PROVIDER_INDENTIFIER)
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError(
        'No password recovery tokens found',
        EnumStatusCode.NotFound
      );
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found', EnumStatusCode.NotFound);
    }

    const compareDate = addSeconds(userToken.created_at, 1);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError(
        'Password recovery has expired',
        EnumStatusCode.UnprocessableEntity
      );
    }

    user.password_hash = await this.hashProvider.generateHash(password);

    await this.usersRepository.update(user);
  }
}

export default ResetPasswordService;
