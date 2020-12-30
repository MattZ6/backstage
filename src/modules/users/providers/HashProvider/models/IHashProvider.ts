export const HASH_PROVIDER_INDENTIFIER = 'HashProvider';

export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
