import type { Request, Response } from "express";
import type { RequestRegistrationOTPUseCase } from "../../../application/use-cases/user/RequestRegistrationOTPUseCase.js";

export class CustomerAuthController {
  constructor(
    private _requestRegisterUserUseCase: RequestRegistrationOTPUseCase,
  ) {}

  async requestRegistrationOTP(req: Request, res: Response): Promise<void> {
    try {
      await this._requestRegisterUserUseCase.execute(req.body);

      res
        .status(200)
        .json({ success: true, message: `Verification OTP sent Successfully` });
    } catch (error) {
      console.error(`Registration OTP request failed : ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
