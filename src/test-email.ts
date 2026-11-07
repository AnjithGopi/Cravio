

import { NodemailerEmailService } from "./infrastructure/services/EmailService.js";

const emailService= new NodemailerEmailService()

const recipient= process.env.EMAIL_USER

if(!recipient){
    throw new Error("email user is not configured")
}

await emailService.sendRegistrationOTP(recipient,"123456")

console.log("Test Email send successfully")