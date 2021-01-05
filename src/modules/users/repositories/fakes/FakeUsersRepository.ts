import { v4 } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async create({
    name,
    nick_name,
    email,
    password_hash,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      name,
      nick_name,
      email,
      password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    } as User);

    this.users.push(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    const index = this.users.findIndex(x => x.id === user.id);

    Object.assign(this.users[index], { ...user, updated_at: new Date() });

    return this.users[index];
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByNickName(nickName: string): Promise<User | undefined> {
    return this.users.find(user => user.nick_name === nickName);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}

export default FakeUsersRepository;
