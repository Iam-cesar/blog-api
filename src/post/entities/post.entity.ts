export class PostEntity {
  id?: number;
  title?: string;
  content?: string;
  published?: boolean;
  category?: { id?: number; name?: string }[];
  authorId?: number;
  deleted?: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
