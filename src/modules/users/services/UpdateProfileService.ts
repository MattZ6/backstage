import { inject, injectable } from 'tsyringe';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository, {
  USERS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  nick_name: string;
  email: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject(USERS_REPOSITORY_INDENTIFIER)
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    name,
    nick_name,
    email,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', EnumStatusCode.NotFound);
    }

    const userWithUpdatedNickName = await this.usersRepository.findByNickName(
      nick_name
    );

    if (userWithUpdatedNickName && userWithUpdatedNickName.id !== user.id) {
      throw new AppError(
        'This nick name is already in use',
        EnumStatusCode.UnprocessableEntity
      );
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError(
        'This email is already in use',
        EnumStatusCode.UnprocessableEntity
      );
    }

    user.name = name;
    user.nick_name = nick_name;
    user.email = email;

    return this.usersRepository.update(user);
  }
}

export default UpdateProfileService;
