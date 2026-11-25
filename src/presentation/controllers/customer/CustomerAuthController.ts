import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { RequestRegistrationOTPUseCase } from "../../../application/use-cases/user/RequestRegistrationOTPUseCase.js";
import type { VerifyRegistrationOTPUseCase } from "../../../application/use-cases/user/VerifyRegistrationOTPUseCase.js";

export class CustomerAuthController {
  constructor(
    private _requestRegisterUserUseCase: RequestRegistrationOTPUseCase,
    private _verifyRegistrationOTPUseCase: VerifyRegistrationOTPUseCase,
  ) {}

  async requestRegistrationOTP(req: Request, res: Response): Promise<void> {
    await this._requestRegisterUserUseCase.execute(req.body);

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: `Verification OTP sent Successfully` });
  }

  async verifyRegistrationOTP(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;

    const user = await this._verifyRegistrationOTPUseCase.execute(email, otp);

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "Registration successful", user });
  }
}
