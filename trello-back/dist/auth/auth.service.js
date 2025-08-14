"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    prismaService;
    userService;
    jwtService;
    configService;
    constructor(prismaService, userService, jwtService, configService) {
        this.prismaService = prismaService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(res, dto) {
        const user = await this.userService.create(dto);
        const tokens = await this.generateTokens(user.name, user.id);
        await this.updateRefreshToken(res, user.id, tokens.refreshToken);
        return tokens;
    }
    async login(res, dto) {
        const { email, password } = dto;
        const user = await this.userService.findByEmail(email);
        if (!user)
            throw new common_1.NotFoundException('Пользователь с такой почтой не найден');
        if (user.password !== password)
            throw new common_1.NotFoundException('Пользователь с таким паролем не найден');
        const tokens = await this.generateTokens(user.name, user.id);
        console.log(tokens);
        await this.updateRefreshToken(res, user.id, tokens.refreshToken);
        return tokens;
    }
    async logout(res, req) {
        const cookie = req.cookies;
        const refreshToken = cookie['refreshToken'];
        res.clearCookie('refreshToken');
        const user = await this.prismaService.user.findFirst({
            where: { refreshToken },
        });
        if (!user)
            throw new common_1.NotFoundException();
        await this.prismaService.user.update({
            where: { id: user.id },
            data: { refreshToken: null },
        });
    }
    async generateTokens(name, id) {
        const payload = { username: name, sub: id };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES'),
        });
        return { accessToken, refreshToken };
    }
    async updateTokens(res, req) {
        const user = await this.userService.findByRefreshToken(req, true);
        if (!user)
            throw new common_1.NotFoundException('полбзователь не найден');
        const cookies = req.cookies;
        const refreshToken = cookies['refreshToken'];
        console.log(refreshToken);
        if (!user.refreshToken)
            throw new common_1.UnauthorizedException('Refresh token not found in cookies');
        if (user.refreshToken !== refreshToken) {
            console.log(user.refreshToken);
            console.log(refreshToken);
            throw new common_1.UnauthorizedException('Refresh token mismatch');
        }
        try {
            await this.jwtService.verifyAsync(refreshToken);
            const tokens = await this.generateTokens(user.name, user.id);
            await this.updateRefreshToken(res, user.id, tokens.refreshToken);
            return tokens;
        }
        catch (e) {
            if (e.name === 'TokenExpiredError')
                throw new common_1.UnauthorizedException('Refresh token expired');
            console.log(e);
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async updateRefreshToken(res, userId, refreshToken) {
        this.setRefreshTokenCookie(res, refreshToken);
        return this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken,
            },
        });
    }
    setRefreshTokenCookie(res, refreshToken) {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
        });
        console.log(res.getHeader('Set-Cookie'));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map