import { IsEmail, IsNotEmpty, Length, Matches } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MessageHelper } from '../../common/helpers/message.helper';
import { RegexHelper } from '../../common/helpers/regexp.helper';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(8, 255)
  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message: MessageHelper.PASSWORD_VALID,
  })
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
