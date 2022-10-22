import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, compareSync, hash } from 'bcrypt';
import { MessageHelper } from '../common/helpers/message.helper';
import { db } from '../prisma/utils/db.server';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthHelper } from './auth.helper';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Tokens } from './types/token.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authHelper: AuthHelper,
  ) {}

  async signin({ id, email }: UserEntity): Promise<Tokens> {
    const payload = { sub: id, email };
    const oneWeek = 60 * 60 * 24 * 7;
    const tokens = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: oneWeek }),
    };

    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }

  async signup(data: CreateUserDto): Promise<Tokens> {
    try {
      const { password, email } = data;

      const { id } = await this.userService.create({
        ...data,
        password: await this.authHelper.createHashPassword(password),
      });

      const { accessToken, refreshToken } = await this.signin({
        id,
        email,
      } as CreateAuthDto);

      await this.updateRefreshToken(id, refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      if (error.meta.target.includes('email'))
        throw new ForbiddenException(MessageHelper.EMAIL_ALREADY_EXISTS);

      throw new BadRequestException(error.message);
    }
  }

  async logout(id: number): Promise<void> {
    const user = await this.userService.findOneWithPassword({ id });

    if (!user?.hashedRefreshToken) throw new BadRequestException();

    await db.user.updateMany({
      where: { id: user.id, hashedRefreshToken: { not: null } },
      data: { hashedRefreshToken: null },
    });
  }

  async refreshToken({ id, requestRefreshToken }): Promise<Tokens> {
    const user = await this.userService.findOneWithPassword({ id });

    if (!user.hashedRefreshToken) throw new UnauthorizedException();

    const refreshTokenMatch = await compare(
      requestRefreshToken,
      user.hashedRefreshToken,
    );

    if (refreshTokenMatch) throw new UnauthorizedException();

    const { accessToken, refreshToken } = await this.signin({
      id: user.id,
      email: user.email,
    });

    await this.updateRefreshToken(id, refreshToken);
    return { accessToken, refreshToken };
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity;

    try {
      user = await this.userService.findOneWithPassword({ email });

      const isPasswordValid = compareSync(password, user?.password);

      if (!isPasswordValid) return null;
    } catch (error) {
      return null;
    }

    return user;
  }

  private async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashToken = await hash(refreshToken, 10);
    await db.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: hashToken },
    });
  }
}
