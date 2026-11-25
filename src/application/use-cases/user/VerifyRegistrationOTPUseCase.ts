import { UserRole } from "../../../domain/enums/UserRole.js";
import type { UserResponseDTO } from "../../dto/user/UserResponseDTO.js";
import { AppError } from "../../errors/AppError.js";
import type { IPendingRegistrationRepository } from "../../interfaces/repositories/IPendingRegistrationRepository.js";
import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { IOTPService } from "../../interfaces/services/IOTPService.js";

export class VerifyRegistrationOTPUseCase {
  constructor(
    private _pendingRegistrationRepository: IPendingRegistrationRepository,
    private _otpService: IOTPService,
    private userRepository: IUserRepository,
  ) {}

  async execute(email: string, otp: string): Promise<UserResponseDTO> {
    const pendingRegistrationData =
      await this._pendingRegistrationRepository.findPendingRegistration(email);

    if (!pendingRegistrationData) {
      throw new AppError(
        "Registration Expired or Not Found",
        "REGISTRATION_EXPIRED",
      );
    }

    const isOtpValid = this._otpService.verifyOTP(
      otp,
      pendingRegistrationData.otpHash,
    );

    if (!isOtpValid) {
      throw new AppError("Invalid Otp", "INVALID_OTP");
    }

    const userData = {
      name: pendingRegistrationData.name,
      email: pendingRegistrationData.email,
      mobile: pendingRegistrationData.mobile,
      passwordHash: pendingRegistrationData.passwordHash,
      role: UserRole.CUSTOMER,
    };

    const createdUser = await this.userRepository.create(userData);
    await this._pendingRegistrationRepository.deletePendingRegistration(email);
    const userResponse: UserResponseDTO = {
      id: createdUser.getId(),
      name: createdUser.getName(),
      email: createdUser.getEmail(),
      mobile: createdUser.getMobile(),
      role: createdUser.getRole(),
    };

    

    return userResponse;
  }
}
