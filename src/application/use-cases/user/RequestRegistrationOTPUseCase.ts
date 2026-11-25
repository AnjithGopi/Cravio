import type { IPendingRegistrationRepository } from "../../interfaces/repositories/IPendingRegistrationRepository.js";
import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { RequestRegistrationOTPDTO } from "../../dto/user/RequestRegistrationOTPDTO.js";
import type { IPasswordService } from "../../interfaces/services/IPasswordService.js";
import type { IOTPService } from "../../interfaces/services/IOTPService.js";
import type { PendingRegistrationData } from "../../dto/user/PendingRegistrationData.js";
import type { IEmailService } from "../../interfaces/services/IEmailService.js";
import { AppError } from "../../errors/AppError.js";

export class RequestRegistrationOTPUseCase {
  constructor(
    private _pendingRegistrationRepository: IPendingRegistrationRepository,
    private _userRepository: IUserRepository,
    private _passwordService: IPasswordService,
    private _otpService: IOTPService,
    private _registrationEmailService: IEmailService,
  ) {}

  private readonly initialFailedAttempt = 0;
  async execute(request: RequestRegistrationOTPDTO) {
    const userExists = await this._userRepository.findByEmail(request.email);
    console.log(userExists);

    if (userExists) {
      throw new AppError("Email Already Exists", " EMAIL_ALREADY_EXISTS");
    }

    const passwordHash = await this._passwordService.hashPassword(
      request.password,
    );

    const otp = this._otpService.generateOTP();
    const otpHash = this._otpService.hashOTP(otp);

    const temporaryUserRegistrationData: PendingRegistrationData = {
      name: request.name,
      email: request.email,
      mobile: request.mobile,
      passwordHash: passwordHash,
      otpHash: otpHash,
      failedAttempts: this.initialFailedAttempt,
    };

    await this._pendingRegistrationRepository.savePendingRegistration(
      temporaryUserRegistrationData,
    );

    try {
      await this._registrationEmailService.sendRegistrationOTP(
        request.email,
        otp,
      );
    } catch (error) {
      try {
        await this._pendingRegistrationRepository.deletePendingRegistration(
          request.email,
        );
      } catch (cleanupError) {
        console.error(
          `Failed to delete pending registration after email failure:${cleanupError}`,
        );
      }

      throw new Error("Unable to send verification email. Please try again ", {
        cause: error,
      });
    }
    return true;
  }
}
