import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { IPasswordService } from "../../interfaces/services/IPasswordService.js";
import type { RegisterUserDTO } from "../../dto/user/RegisterUserDTO.js";
import { UserRole } from "../../../domain/enums/UserRole.js";
import type { UserResponseDTO } from "../../dto/user/UserResponseDTO.js";

class RegisterUserUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _passwordService: IPasswordService,
  ) {}

  async execute(request: RegisterUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this._userRepository.findByEmail(request.email);

    if (existingUser) {
      throw new Error("user already exists");
    }

    const passwordHash = await this._passwordService.hashPassword(
      request.password,
    );

    const savedUser = await this._userRepository.create({
      name: request.name,
      email: request.email,
      mobile: request.mobile,
      passwordHash: passwordHash,
      role: UserRole.CUSTOMER,
    });

    return {
      id: savedUser.getId(),
      name: savedUser.getName(),
      email: savedUser.getEmail(),
      mobile: savedUser.getMobile(),
      role: savedUser.getRole(),
    };
  }
}
