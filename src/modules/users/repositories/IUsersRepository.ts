import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByNickName(nick: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
