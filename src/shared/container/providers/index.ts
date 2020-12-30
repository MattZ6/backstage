import { container } from 'tsyringe';

import IMailTemplateProvider, {
  MAIL_TEMPLATE_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailProvider';

import IMailProvider, {
  MAIL_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IMailTemplateProvider>(
  MAIL_TEMPLATE_PROVIDER_INDENTIFIER,
  HandlebarsMailProvider
);

container.registerInstance<IMailProvider>(
  MAIL_PROVIDER_INDENTIFIER,
  container.resolve(EtherealMailProvider)
);
