import { UserEntity } from '../../user/entities/user.entity';

export class RoleEntity {
  id?: string;
  name?: string;
  user?: Partial<UserEntity>;
  permitions?: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;

  constructor(params?: RoleEntity) {
    this.id = params.id;
    this.name = params.name;
    this.permitions = params.permitions;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.user = params.user;
  }
}
