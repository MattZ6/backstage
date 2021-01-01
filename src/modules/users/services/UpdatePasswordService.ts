import { injectable, inject } from 'tsyringe';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository, {
  USERS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUsersRepository';

import IHashProvider, {
  HASH_PROVIDER_INDENTIFIER,
} from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  old_password: string;
  password: string;
}

@injectable()
class UpdatePasswordService {
  constructor(
    @inject(USERS_REPOSITORY_INDENTIFIER)
    private usersRepository: IUsersRepository,

    @inject(HASH_PROVIDER_INDENTIFIER)
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', EnumStatusCode.NotFound);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      old_password,
      user.password_hash
    );

    if (!passwordMatch) {
      throw new AppError(
        'Old password does not match',
        EnumStatusCode.UnprocessableEntity
      );
    }

    user.password_hash = await this.hashProvider.generateHash(password);

    return this.usersRepository.update(user);
  }
}

export default UpdatePasswordService;
