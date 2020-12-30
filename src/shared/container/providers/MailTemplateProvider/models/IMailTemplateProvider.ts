import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export const MAIL_TEMPLATE_PROVIDER_INDENTIFIER = 'MailTemplateProvider';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
