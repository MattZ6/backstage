import { getRepository, Repository } from 'typeorm';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async create(user_id: string): Promise<UserToken> {
    const userToken = this.repository.create({ user_id });

    return this.repository.save(userToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.repository.findOne({
      where: { token },
    });
  }
}

export default UserTokensRepository;
