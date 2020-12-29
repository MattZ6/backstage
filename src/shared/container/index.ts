import { container } from 'tsyringe';

import IUsersRepository, {
  USERS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  USERS_REPOSITORY_INDENTIFIER,
  UsersRepository
);
