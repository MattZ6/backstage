import { inject, injectable } from 'tsyringe';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IHashProvider, {
  HASH_PROVIDER_INDENTIFIER,
} from '@modules/users/providers/HashProvider/models/IHashProvider';

import IUsersRepository, {
  USERS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  nick_name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject(USERS_REPOSITORY_INDENTIFIER)
    private usersRepository: IUsersRepository,

    @inject(HASH_PROVIDER_INDENTIFIER)
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    nick_name,
    email,
    password,
  }: IRequest): Promise<User> {
    const userWithThisEmail = await this.usersRepository.findByEmail(email);

    if (userWithThisEmail) {
      throw new AppError(
        'Email address already been taken',
        EnumStatusCode.Conflict
      );
    }

    const userWithThisNickName = await this.usersRepository.findByNickName(
      nick_name
    );

    if (userWithThisNickName) {
      throw new AppError(
        'Nick name already been taken',
        EnumStatusCode.Conflict
      );
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      nick_name,
      password_hash: passwordHash,
    });

    return user;
  }
}

export default CreateUserService;
