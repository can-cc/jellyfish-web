export class UserInfo {
  public id: string;
  public username: string;

  static new(data: any): UserInfo {
    const user = new UserInfo();
    user.id = data.id;
    user.username = data.username;
    return user;
  }
}
