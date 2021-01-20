/* eslint-disable @typescript-eslint/no-explicit-any */
export const CACHE_PROVIDER_INDENTIFIER = 'CacheProvider';

export default interface ICacheProvider {
  store(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
