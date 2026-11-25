import type { PendingRegistrationData } from "../../dto/user/PendingRegistrationData.js";

export interface IPendingRegistrationRepository {
  savePendingRegistration(data: PendingRegistrationData): Promise<void>;
  findPendingRegistration(
    email: string,
  ): Promise<PendingRegistrationData | null>;
  deletePendingRegistration(email: string): Promise<void>;
  incrementFailedAttempts(email: string): Promise<number | null>;
}
