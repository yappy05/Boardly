import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(res: Response, dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(res: Response, req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(res: Response, dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(res: Response, req: Request): Promise<void>;
}
