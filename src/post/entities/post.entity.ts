import { LikeEntity } from 'src/like/entities/like.entity';

export class PostEntity {
  id?: string;
  title?: string;
  content?: string;
  published?: boolean;
  category?: { id?: string; name?: string }[];
  authorId?: string;
  author?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  like?: LikeEntity[];
  deleted?: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(params?: PostEntity) {
    this.id = params.id;
    this.author = params.author;
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
