import { User } from "../../../domain/entities/User.js";
import type { CreateUserData } from "../../dto/user/CreateUserData.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
}
