export interface IOTPService {
  generateOTP(): string;
  hashOTP(otp: string): string;
  verifyOTP(otp: string, otpHash: string): boolean;
}
