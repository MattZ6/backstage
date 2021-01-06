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

import IIntrumentsRepository, {
  INSTRUMENTS_REPOSITORY_INDENTIFIER,
} from '@modules/instruments/repositories/IIntrumentsRepository';
import InstrumentsRepository from '@modules/instruments/infra/typeorm/repositories/InstrumentsRepository';

import IMusicStylesRepository, {
  MUSIC_STYLES_REPOSITORY_INDENTIFIER,
} from '@modules/music_styles/repositories/IMusicStylesRepository';
import MusicStyleRepositories from '@modules/music_styles/infra/typeorm/repositories/MusicStylesRepository';

container.registerSingleton<IUsersRepository>(
  USERS_REPOSITORY_INDENTIFIER,
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  USER_TOKENS_REPOSITORY_INDENTIFIER,
  UserTokensRepository
);

container.registerSingleton<IIntrumentsRepository>(
  INSTRUMENTS_REPOSITORY_INDENTIFIER,
  InstrumentsRepository
);

container.registerSingleton<IMusicStylesRepository>(
  MUSIC_STYLES_REPOSITORY_INDENTIFIER,
  MusicStyleRepositories
);
