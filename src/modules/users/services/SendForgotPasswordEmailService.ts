import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import UsersRepository, {
  USERS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUsersRepository';

import IUserTokensRepository, {
  USER_TOKENS_REPOSITORY_INDENTIFIER,
} from '@modules/users/repositories/IUserTokensRepository';

import IMailProvider, {
  MAIL_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject(USERS_REPOSITORY_INDENTIFIER)
    private usersRepository: UsersRepository,

    @inject(USER_TOKENS_REPOSITORY_INDENTIFIER)
    private userTokensRepository: IUserTokensRepository,

    @inject(MAIL_PROVIDER_INDENTIFIER)
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'No users registered with this email',
        EnumStatusCode.NotFound
      );
    }

    const { token } = await this.userTokensRepository.create(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    return this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'HUB | Recuperação de senha 🔐',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
