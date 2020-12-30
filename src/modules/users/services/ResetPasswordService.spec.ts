import faker from 'faker';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it('should be able to reset the password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    const { token } = await fakeUserTokensRepository.create(user.id);

    const newPassword = 'newpassword';

    await resetPassword.execute({
      token,
      password: newPassword,
    });

    expect(generateHash).toHaveBeenCalledWith(newPassword);

    const userWithUpdatedPassword = await fakeUsersRepository.findById(user.id);

    expect(userWithUpdatedPassword).not.toBeUndefined();

    await expect(
      fakeHashProvider.compareHash(
        newPassword,
        (userWithUpdatedPassword as User).password_hash
      )
    ).resolves.toBeTruthy();
  });

  it('should not be able to reset the password from non existing token', async () => {
    await expect(
      resetPassword.execute({
        token: faker.random.uuid(),
        password: faker.internet.password(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password from non existing user', async () => {
    const { token } = await fakeUserTokensRepository.create(
      faker.random.uuid()
    );

    await expect(
      resetPassword.execute({
        token,
        password: faker.internet.password(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    const { token } = await fakeUserTokensRepository.create(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setSeconds(customDate.getSeconds() + 2);
    });

    await expect(
      resetPassword.execute({
        token,
        password: 'newpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
