import { container } from 'tsyringe';

import IHashProvider, {
  HASH_PROVIDER_INDENTIFIER,
} from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>(
  HASH_PROVIDER_INDENTIFIER,
  BCryptHashProvider
);
