import { injectable } from "inversify";
import type { IOTPService } from "../../application/interfaces/services/IOTPService.js";
import { randomInt, createHmac, timingSafeEqual } from "node:crypto";

@injectable()
export class CryptoOTPService implements IOTPService {
  private readonly value = "0";
  private readonly hashingAlgorithm = "sha256";
  private readonly digest = "hex";
  generateOTP(): string {
    const otp = randomInt(1000000).toString().padStart(6, this.value);
    return otp;
  }

  hashOTP(otp: string): string {
    const secret = process.env.OTP_SECRET;

    if (!secret) {
      throw new Error("OTP_SECRET is not configured");
    }

    const hashedOTP = createHmac(this.hashingAlgorithm, secret)
      .update(otp)
      .digest(this.digest);
    return hashedOTP;
  }

  verifyOTP(otp: string, otpHash: string): boolean {
    const hashedOtp = this.hashOTP(otp);
    const otpBuffer = Buffer.from(hashedOtp, this.digest);
    const otpHashBuffer = Buffer.from(otpHash, this.digest);

    if (otpBuffer.length !== otpHashBuffer.length) {
      return false;
    }

    return timingSafeEqual(otpBuffer, otpHashBuffer);
  }
}
