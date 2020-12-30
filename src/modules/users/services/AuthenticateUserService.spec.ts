import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await createUser.execute({
      name: faker.name.firstName(),
      nick_name: faker.internet.userName(),
      email,
      password,
    });

    const data = await authenticateUser.execute({
      email,
      password,
    });

    expect(data).toHaveProperty('access_token');
  });

  it('should not be able to authenticate with non registered user', async () => {
    await expect(
      authenticateUser.execute({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await createUser.execute({
      name: faker.name.firstName(),
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: 'wrongpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
