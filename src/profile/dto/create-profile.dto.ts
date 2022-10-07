import { IsNotEmpty, Length } from '@nestjs/class-validator';
import { Prisma } from '@prisma/client';

export class CreateProfileDto {
  @Length(4, 240)
  bio: string;

  @IsNotEmpty()
  user: Prisma.UserCreateNestedOneWithoutProfileInput;

  createdAt?: string | Date;
  updatedAt?: string | Date;
}
