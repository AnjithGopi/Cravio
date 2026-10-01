import type { IPasswordService } from "../../application/interfaces/services/IPasswordService.js";
import bcrypt from "bcrypt";

export class BcryptPasswordService implements IPasswordService {
  private readonly saltRoundes = 12;
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRoundes);
  }
}
