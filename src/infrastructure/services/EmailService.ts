import type { IEmailService } from "../../application/interfaces/services/IEmailService.js";
import nodemailer from "nodemailer";
import { registrationOTPTemplate } from "./templates/registrationOTPTemplate.js";
export class NodemailerEmailService implements IEmailService {
  private readonly emailService = "gmail";
  private readonly subject = "Verify your Cravio Account";
  private readonly transporter = nodemailer.createTransport({
    service: this.emailService,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  async sendRegistrationOTP(email: string, otp: string): Promise<void> {
    const senderEmail = process.env.EMAIL_USER;

    if (!senderEmail) {
      throw new Error("Email user is not configured");
    }

    await this.transporter.sendMail({
      from: `Cravio<${senderEmail}>`,
      to: email,
      subject: this.subject,
      html: registrationOTPTemplate(otp),
    });
  }
}
