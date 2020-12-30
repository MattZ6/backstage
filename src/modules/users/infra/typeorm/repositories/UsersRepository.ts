import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({
    name,
    nick_name,
    email,
    password_hash,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      nick_name,
      password_hash,
    });

    return this.repository.save(user);
  }

  public async update(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  public async findByNickName(nickName: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { nick_name: nickName },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { email },
    });
  }
}

export default UsersRepository;
