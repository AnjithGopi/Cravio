export interface IEmailService {
  sendRegistrationOTP(email: string, otp: string): Promise<void>;
}
