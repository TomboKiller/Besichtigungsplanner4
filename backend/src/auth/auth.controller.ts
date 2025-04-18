import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './constants';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) response: Response,
  ) {
    const value = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    const oneDay = 1000 * 60 * 60 * 24;
    response.cookie('key', value.access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });
    return { success: true }; // Return a response to complete the request
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('key');
    return { success: true };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: Record<string, any>) {
    return this.authService.register(
      registerDto.username,
      registerDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
