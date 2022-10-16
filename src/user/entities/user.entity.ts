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
  hashedRefreshToken?: string;
  role?: string;
  like?: object | null;
  post?: object | null;
  profile?: object | null;

  constructor(params?: {
    id?: number;
    createdAt?: string | Date;
    updatedAt?: any;
    deletedAt?: string | Date;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    deleted?: boolean;
  }) {
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
