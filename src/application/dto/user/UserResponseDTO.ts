import type { UserRole } from "../../../domain/enums/UserRole.js";

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
}
