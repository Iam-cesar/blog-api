import { Prisma } from '@prisma/client';

export class CreateProfileDto {
  bio: string;
  user: Prisma.UserCreateNestedOneWithoutProfileInput;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
