import { PostEntity } from '../../post/entities/post.entity';

export class CategoryEntity {
  id?: string;
  name?: string;
  post?: Partial<PostEntity>;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(params: CategoryEntity) {
    this.id = params.id;
    this.name = params.name;
    this.post = params.post;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
