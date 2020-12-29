import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
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
    private usersRepository: IUsersRepository
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

    const passwordHash = await hash(password, 10);

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
