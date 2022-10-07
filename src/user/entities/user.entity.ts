export class UserEntity {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  deleted?: boolean;
  deletedAt?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  role?: string;
  like?: object | null;
  post?: object | null;
  profile?: object | null;
}
