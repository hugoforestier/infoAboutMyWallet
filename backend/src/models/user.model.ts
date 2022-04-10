export class User {
  u_uuid: string;
  username: string;
  email: string;
  password?: string;
  salt?: string | null;
  type?: string | null;

  constructor(
    u_uuid: string,
    username: string,
    email: string,
    password?: string,
    salt?: string,
    type?: string,
  ) {
    this.u_uuid = u_uuid;
    this.username = username;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.type = type;
  }
}
