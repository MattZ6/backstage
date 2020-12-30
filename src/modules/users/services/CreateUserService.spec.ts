import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const nick_name = faker.internet.userName();
    const email = faker.internet.email();

    const user = await createUser.execute({
      name,
      nick_name,
      email,
      password: faker.internet.password(),
    });

    faker.name.findName();

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(name);
    expect(user.nick_name).toBe(nick_name);
    expect(user.email).toBe(email);
  });

  it('should not be able to create a user with same nick name from another', async () => {
    const nick_name = faker.internet.userName();

    await createUser.execute({
      name: faker.name.firstName(),
      nick_name,
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(
      createUser.execute({
        name: faker.name.firstName(),
        nick_name,
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user with same email from another', async () => {
    const email = faker.internet.email();

    await createUser.execute({
      name: faker.name.firstName(),
      nick_name: faker.internet.userName(),
      email,
      password: faker.internet.password(),
    });

    await expect(
      createUser.execute({
        name: faker.name.firstName(),
        nick_name: faker.internet.userName(),
        email,
        password: faker.internet.password(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
