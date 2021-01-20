import { container } from 'tsyringe';

import ICacheProvider, {
  CACHE_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
  CACHE_PROVIDER_INDENTIFIER,
  providers.redis
);
