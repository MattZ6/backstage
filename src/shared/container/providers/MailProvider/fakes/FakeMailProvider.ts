import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[];

  constructor() {
    this.messages = [];
  }

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
