export class RoleEntity {
  id?: number;
  name?: string;
  canCreatePost?: boolean;
  canUpdatePost?: boolean;
  canDeletePost?: boolean;
  canSoftDeletePost?: boolean;
  canCreateUser?: boolean;
  canUpdateUser?: boolean;
  canDeleteUser?: boolean;
  canSoftDeleteUser?: boolean;
  canLikeUser?: boolean;
  canLikePost?: boolean;
}
