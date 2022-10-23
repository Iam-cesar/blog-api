export class ProfileEntity {
  id?: string;
  bio?: string;
  userId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;

  constructor(params?: ProfileEntity) {
    this.id = params.id;
    this.bio = params.bio;
    this.userId = params.userId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
