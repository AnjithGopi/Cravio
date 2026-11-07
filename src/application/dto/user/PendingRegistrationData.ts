export interface PendingRegistrationData {
  readonly name: string;
  readonly email: string;
  readonly mobile: string;
  readonly passwordHash: string;
  readonly otpHash: string;
  readonly failedAttempts: number;
}
