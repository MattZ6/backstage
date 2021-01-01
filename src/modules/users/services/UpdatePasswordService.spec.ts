import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdatePasswordService from '@modules/users/services/UpdatePasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updatePassword: UpdatePasswordService;

describe('UpdatePassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updatePassword = new UpdatePasswordService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to update user password', async () => {
    const oldPassword = faker.internet.password();
    const newPassword = faker.internet.password();

    const { id } = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: oldPassword,
    });

    const user = await updatePassword.execute({
      user_id: id,
      old_password: oldPassword,
      password: newPassword,
    });

    expect(user.password_hash).toBe(newPassword);
  });

  it('should not be able to update the password of a non existing user', async () => {
    await expect(
      updatePassword.execute({
        user_id: faker.random.uuid(),
        old_password: faker.internet.password(),
        password: faker.internet.password(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update with wrong old password', async () => {
    const { id } = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    await expect(
      updatePassword.execute({
        user_id: id,
        old_password: faker.internet.password(),
        password: faker.internet.password(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
