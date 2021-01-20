import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async store(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public async invalidate(key: string): Promise<void> {
    const newCache: ICacheData = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const cacheKey in this.cache) {
      if (!this.cache[key]) {
        newCache[cacheKey] = this.cache[cacheKey];
      }
    }

    this.cache = newCache;
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const newCache: ICacheData = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const cacheKey in this.cache) {
      if (!cacheKey.startsWith(`${prefix}:`)) {
        newCache[cacheKey] = this.cache[cacheKey];
      }
    }

    this.cache = newCache;
  }
}
