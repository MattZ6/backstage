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

type IResponse = Omit<User, 'password_hash'>;

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
  }: IRequest): Promise<IResponse> {
    const alreadyExistsWithThisEmail = await this.usersRepository.findByEmail(
      email
    );

    if (alreadyExistsWithThisEmail) {
      throw new AppError(
        'Email address already been taken',
        EnumStatusCode.Conflict
      );
    }

    const alreadyExistsWithThisNickName = await this.usersRepository.findByNickName(
      nick_name
    );

    if (alreadyExistsWithThisNickName) {
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

    return {
      id: user.id,
      name: user.name,
      nick_name: user.nick_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}

export default CreateUserService;
