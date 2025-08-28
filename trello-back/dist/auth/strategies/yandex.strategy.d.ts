import { Strategy } from 'passport-yandex';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
declare const YandexStrategy_base: new (config: import("passport-yandex").Config) => Strategy<unknown> & {
    validate(...args: any[]): unknown;
};
export declare class YandexStrategy extends YandexStrategy_base {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<void>;
}
export {};
