import mongoose from "mongoose";
import { UserRole } from "../../../../domain/enums/UserRole.js";

export interface UserDocument {
  name: string;
  email: string;
  mobile: string;
  passwordHash: string;
  role: UserRole;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: UserRole, required: true },
});

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
