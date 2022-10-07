import { Prisma } from '@prisma/client';

export class CreateUserDto {
  passwordId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  deleted?: boolean;
  deletedAt: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
  Role: Prisma.RoleCreateNestedOneWithoutUserInput;
  like?: Prisma.LikeCreateNestedManyWithoutUserInput;
  post?: Prisma.PostCreateNestedManyWithoutAuthorInput;
  profile?: Prisma.ProfileCreateNestedOneWithoutUserInput;
}
