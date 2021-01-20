import { container } from 'tsyringe';

import IMailTemplateProvider, {
  MAIL_TEMPLATE_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

import HandlebarsMailProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailProvider';

const providers = {
  handlebars: HandlebarsMailProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  MAIL_TEMPLATE_PROVIDER_INDENTIFIER,
  providers.handlebars
);
