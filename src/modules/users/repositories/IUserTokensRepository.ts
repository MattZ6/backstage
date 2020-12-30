import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export const USER_TOKENS_REPOSITORY_INDENTIFIER = 'UserTokensRepository';

export default interface IUserTokensRepository {
  create(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
