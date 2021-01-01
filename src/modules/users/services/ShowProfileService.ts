import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository, {
  USERS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUsersRepository';

@injectable()
class ShowProfileService {
  constructor(
    @inject(USERS_REPOSITORY_INDENTIFIER)
    private usersRepository: IUsersRepository
  ) {}

  public async execute(user_id: string): Promise<Omit<User, 'password_hash'>> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

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

export default ShowProfileService;
