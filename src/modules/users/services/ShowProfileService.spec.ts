import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    const profile = await showProfile.execute(user.id);

    expect(profile).toBe(user);
  });

  it('should not be able to profile from a non existing user', async () => {
    await expect(
      showProfile.execute(faker.random.uuid())
    ).rejects.toBeInstanceOf(AppError);
  });
});
