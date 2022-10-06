class AuthHelper {
  async createHashPassword(password): Promise<string> {
    const hashPassword = password;
    return `hash${hashPassword}`;
  }
}

export default new AuthHelper();
