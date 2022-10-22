export class LikeEntity {
  id?: number;
  commentId?: number;
  postId?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(params?: LikeEntity) {
    this.id = params.id;
    this.commentId = params.commentId;
    this.postId = params.postId;
    this.userId = params.userId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
