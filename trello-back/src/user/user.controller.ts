import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('email')
  public async findUserByEmail(@Body('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Get('find-by-req')
  public async findByRefreshToken(@Req() req: Request) {
    return await this.userService.findByRefreshToken(req);
  }
}
