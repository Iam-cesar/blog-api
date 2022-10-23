import { LikeEntity } from 'src/like/entities/like.entity';

export class CommentEntity {
  id?: string;
  content?: string;
  postId?: string;
  like?: LikeEntity[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(params: CommentEntity) {
    this.id = params.id;
    this.content = params.content;
    this.postId = params.postId;
    this.like = params.like;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
