import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByNickName(nickName: string): Promise<User | undefined> {
    return this.findOne({
      where: { nick_name: nickName },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({
      where: { email },
    });
  }
}

export default UsersRepository;
