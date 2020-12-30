import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

import IMailTemplateProvider, {
  MAIL_TEMPLATE_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject(MAIL_TEMPLATE_PROVIDER_INDENTIFIER)
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.initialize();
  }

  private async initialize() {
    const account = await nodemailer.createTestAccount();

    this.client = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const text = await this.mailTemplateProvider.parse(templateData);

    const message = await this.client.sendMail({
      from: {
        name: from?.name ?? 'Equipe Hub',
        address: from?.email ?? 'equipe@hub.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text,
    });

    console.log(message.messageId);
    console.log(nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
