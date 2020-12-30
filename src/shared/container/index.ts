import { container } from 'tsyringe';

import '@modules/users/providers';

import '@shared/container/providers';

import IUsersRepository, {
  USERS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository, {
  USER_TOKENS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
  USERS_REPOSITORY_INDENTIFIER,
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  USER_TOKENS_REPOSITORY_INDENTIFIER,
  UserTokensRepository
);
