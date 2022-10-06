import { Prisma } from '@prisma/client';

export class CreateRoleDto {
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
}
