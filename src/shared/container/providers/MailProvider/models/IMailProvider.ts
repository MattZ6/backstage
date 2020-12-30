import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

export const MAIL_PROVIDER_INDENTIFIER = 'MailProvider';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
