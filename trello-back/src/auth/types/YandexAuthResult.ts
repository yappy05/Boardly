import { User } from 'prisma/__generated__';

export interface YandexAuthResult {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
