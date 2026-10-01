import type { UserRole } from "../../../domain/enums/UserRole.js";

export interface CreateUserData {
  name: string;
  email: string;
  mobile: string;
  passwordHash: string;
  role: UserRole;
}
