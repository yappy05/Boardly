import { User } from 'prisma/__generated__';

export interface GoogleAuthResult {
  user: User; // или более конкретный тип User
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
