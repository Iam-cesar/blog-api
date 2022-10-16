import { UserEntity } from 'src/user/entities/user.entity';

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
  user?: UserEntity[];
  createdAt?: string | Date;
  updatedAt?: string | Date;

  constructor(params?: RoleEntity) {
    this.id = params.id;
    this.name = params.name;
    this.canCreatePost = params.canCreatePost;
    this.canUpdatePost = params.canUpdatePost;
    this.canDeletePost = params.canDeletePost;
    this.canSoftDeletePost = params.canSoftDeletePost;
    this.canCreateUser = params.canCreateUser;
    this.canUpdateUser = params.canUpdateUser;
    this.canDeleteUser = params.canDeleteUser;
    this.canSoftDeleteUser = params.canSoftDeleteUser;
    this.canLikeUser = params.canLikeUser;
    this.canLikePost = params.canLikePost;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.user = params.user;
  }
}
