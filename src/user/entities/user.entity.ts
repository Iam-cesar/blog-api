import { Prisma } from '@prisma/client';
import { LikeEntity } from '../../like/entities/like.entity';
import { PostEntity } from '../../post/entities/post.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { RoleEntity } from '../../role/entities/role.entity';

export class UserEntity {
  _count?: Prisma.UserCountOutputType;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  deleted?: boolean;
  deletedAt?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  hashedRefreshToken?: string;
  role?: Partial<RoleEntity>;
  like?: Partial<LikeEntity[]>;
  post?: Partial<PostEntity[]>;
  profile?: Partial<ProfileEntity>;

  constructor(params?: UserEntity) {
    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.email = params.email;
    this.password = params.password;
    this.deletedAt = params.deletedAt;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.deleted = params.deleted;
  }
}
