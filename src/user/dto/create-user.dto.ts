import {
  IsEmail,
  IsEmpty,
  IsHash,
  IsOptional,
  Length,
  Matches,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { MessageHelper } from '../../helpers/message.helper';
import { RegexHelper } from '../../helpers/regexp.helper';

export class CreateUserDto {
  @ApiProperty()
  @Length(4, 255)
  firstName: string;

  @Length(4, 255)
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(8, 255)
  @Matches(RegexHelper.password, {
    message: MessageHelper.PASSWORD_VALID,
  })
  @ApiProperty()
  password: string;

  @IsOptional()
  deleted?: boolean;

  @IsEmpty()
  deletedAt: string | Date;

  @IsEmpty()
  createdAt: string | Date;

  @IsEmpty()
  updatedAt: string | Date;

  Role: Prisma.RoleCreateNestedOneWithoutUserInput;

  @IsOptional()
  like?: Prisma.LikeCreateNestedManyWithoutUserInput;

  @IsOptional()
  post?: Prisma.PostCreateNestedManyWithoutAuthorInput;

  @IsOptional()
  profile?: Prisma.ProfileCreateNestedOneWithoutUserInput;

  @IsOptional()
  @IsHash('HS512')
  hashedRefreshToken?: string;
}
