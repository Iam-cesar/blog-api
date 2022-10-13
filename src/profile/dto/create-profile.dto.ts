import { IsEmpty, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateProfileDto {
  @ApiProperty()
  @Length(4, 240)
  bio: string;

  @IsEmpty()
  user: Prisma.UserCreateNestedOneWithoutProfileInput;

  @IsEmpty()
  createdAt?: string | Date;

  @IsEmpty()
  updatedAt?: string | Date;
}
