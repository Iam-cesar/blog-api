import { IsEmail, IsOptional, Length, Matches } from '@nestjs/class-validator';
import { Prisma } from '@prisma/client';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegexHelper } from 'src/helpers/regexp.helper';

export class CreateUserDto {
  @Length(4, 255)
  firstName: string;

  @Length(4, 255)
  lastName: string;

  @IsEmail()
  email: string;

  @Length(8, 255)
  @Matches(RegexHelper.password, {
    message: MessageHelper.PASSWORD_VALID,
  })
  password: string;

  @IsOptional()
  deleted?: boolean;

  deletedAt: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;

  Role: Prisma.RoleCreateNestedOneWithoutUserInput;

  @IsOptional()
  like?: Prisma.LikeCreateNestedManyWithoutUserInput;

  @IsOptional()
  post?: Prisma.PostCreateNestedManyWithoutAuthorInput;

  @IsOptional()
  profile?: Prisma.ProfileCreateNestedOneWithoutUserInput;
}
