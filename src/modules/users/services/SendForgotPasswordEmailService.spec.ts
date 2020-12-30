import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider
    );
  });

  it('should be able to recover users password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    await sendForgotPasswordEmail.execute({
      email: user.email,
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: faker.internet.email(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const createUserToken = jest.spyOn(fakeUserTokensRepository, 'create');

    const user = await fakeUsersRepository.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      nick_name: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    });

    await sendForgotPasswordEmail.execute({
      email: user.email,
    });

    expect(createUserToken).toHaveBeenCalledWith(user.id);
  });
});
