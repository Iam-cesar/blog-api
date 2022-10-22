import { LikeEntity } from 'src/like/entities/like.entity';

export class PostEntity {
  id?: number;
  title?: string;
  content?: string;
  published?: boolean;
  category?: { id?: number; name?: string }[];
  authorId?: number;
  like?: LikeEntity[];
  deleted?: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(params?: PostEntity) {
    this.id = params.id;
    this.title = params.title;
    this.content = params.content;
    this.published = params.published;
    this.category = params.category;
    this.like = params.like;
    this.authorId = params.authorId;
    this.deleted = params.deleted;
    this.deletedAt = params.deletedAt;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
