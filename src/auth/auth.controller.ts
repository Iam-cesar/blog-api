/* eslint-disable @typescript-eslint/no-unused-vars */
// "data" in signin route is declared for documentation /doc
import {
  Body,
  Controller,
  HttpCode,
  Options,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Tokens } from './types/token.type';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Options('signin')
  @HttpCode(204)
  async optionsSignin() {
    return {};
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  @HttpCode(200)
  async signinLocal(
    @Req() req: { user: { id: string } },
  ): Promise<Partial<Tokens>> {
    const { accessToken } = await this.authService.signin(req.user);
    return { accessToken };
  }

  @Options('signup')
  @HttpCode(204)
  async optionsSignUp() {
    return {};
  }

  @Post('signup')
  @HttpCode(201)
  async signupLocal(@Body() data: CreateAuthDto): Promise<Partial<Tokens>> {
    const { accessToken } = await this.authService.signup(data);
    return { accessToken };
  }

  @Options('logout')
  @HttpCode(204)
  async optionsLogout() {
    return {};
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req: { user: { id: string } }): Promise<void> {
    return await this.authService.logout(req.user.id);
  }

  @Options('refresh')
  @HttpCode(204)
  async optionsRefresh() {
    return {};
  }

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('refresh')
  async refreshTokenLocal(
    @Req() req: { user: { id: string; hashedRefreshToken: string } },
  ): Promise<Partial<Tokens>> {
    const { accessToken } = await this.authService.refreshToken({
      id: req.user.id,
      requestRefreshToken: req.user.hashedRefreshToken,
    });

    return { accessToken };
  }
}
