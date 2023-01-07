import { UserEntity } from './../../user/entities/user.entity';
export class LikeEntity {
  id?: string;
  commentId?: string;
  postId?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserEntity;

  constructor(params?: LikeEntity) {
    this.id = params.id;
    this.commentId = params.commentId;
    this.postId = params.postId;
    this.userId = params.userId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
