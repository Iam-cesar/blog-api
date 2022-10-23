import { genSaltSync, hashSync } from 'bcryptjs';

export class AuthHelper {
  async createHashPassword(password: string): Promise<string> {
    const salt = genSaltSync(12);
    return hashSync(password, salt);
  }
}
