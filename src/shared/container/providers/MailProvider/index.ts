import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider, {
  MAIL_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/MailProvider/models/IMailProvider';

import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
  MAIL_PROVIDER_INDENTIFIER,
  providers[mailConfig.driver]
);
