import { User } from 'prisma/__generated__';
export interface GoogleAuthResult {
    user: User;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}
