export class PostEntity {
  id?: number;
  title?: string;
  content?: string;
  published?: boolean;
  authorId?: number;
  deleted?: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
