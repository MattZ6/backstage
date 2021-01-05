import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(fakeUsersRepository);
  });

  it('should be able to update user data', async () => {
    const { id } = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    const newNickName = faker.internet.userName();
    const newName = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const newEmail = faker.internet.email();

    const user = await updateProfile.execute({
      user_id: id,
      name: newName,
      nick_name: newNickName,
      email: newEmail,
    });

    expect(user.name).toBe(newName);
    expect(user.nick_name).toBe(newNickName);
    expect(user.email).toBe(newEmail);
  });

  it('should not be able to update a non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: faker.random.uuid(),
        nick_name: faker.internet.userName(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user nick name', async () => {
    const { id } = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    const user = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    await expect(
      updateProfile.execute({
        user_id: id,
        nick_name: user.nick_name,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    const { id } = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    const user = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    await expect(
      updateProfile.execute({
        user_id: id,
        nick_name: faker.internet.userName(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: user.email,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
