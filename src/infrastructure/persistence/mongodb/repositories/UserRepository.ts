import type { CreateUserData } from "../../../../application/dto/user/CreateUserData.js";
import type { IUserRepository } from "../../../../application/interfaces/repositories/IUserRepository.js";
import { User } from "../../../../domain/entities/User.js";
import { UserModel } from "../models/UserModel.js";
import type { UserDocument } from "../models/UserModel.js";
import type { HydratedDocument } from "mongoose";

export class UserRepository implements IUserRepository {
  private toDomain(document: HydratedDocument<UserDocument>): User {
    return new User(
      document._id.toString(),
      document.name,
      document.email,
      document.mobile,
      document.passwordHash,
      document.role,
    );
  }
  async findByEmail(email: string): Promise<User | null> {
    const document = await UserModel.findOne({ email });

    if (!document) {
      return null;
    }

    return this.toDomain(document);
  }

  async create(data: CreateUserData): Promise<User> {
    const document = await UserModel.create(data);
    return this.toDomain(document);
  }
}
