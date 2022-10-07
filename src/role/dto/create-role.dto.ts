import { Length } from '@nestjs/class-validator';
import { Prisma } from '@prisma/client';

export class CreateRoleDto {
  @Length(4, 64)
  name: string;

  canCreatePost: boolean;
  canUpdatePost: boolean;
  canDeletePost: boolean;
  canSoftDeletePost: boolean;
  canCreateUser: boolean;
  canUpdateUser: boolean;
  canDeleteUser: boolean;
  canSoftDeleteUser: boolean;
  canLikeUser: boolean;
  canLikePost: boolean;
  user?: Prisma.UserCreateNestedManyWithoutRoleInput;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
