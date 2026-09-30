import { UserRole } from "../enums/UserRole.js";

export class User {
  private readonly id: string;
  private name: string;
  private email: string;
  private mobile: string;
  private passwordHash: string;
  private role: UserRole;

  constructor(
    id: string,
    name: string,
    email: string,
    mobile: string,
    passwordHash: string,
    role: UserRole,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.passwordHash = passwordHash;
    this.role = role;
  }

  getId():string {
    return this.id;
  }

  getName():string {
    return this.name;
  }

  getEmail():string {
    return this.email;
  }

  getMobile():string {
    return this.mobile;
  }

  getRole():string {
    return this.role;
  }
}
