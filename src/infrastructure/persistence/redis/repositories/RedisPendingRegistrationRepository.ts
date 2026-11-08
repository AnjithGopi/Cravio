import type { PendingRegistrationData } from "../../../../application/dto/user/PendingRegistrationData.js";
import type { IPendingRegistrationRepository } from "../../../../application/interfaces/repositories/IPendingRegistrationRepository.js";
import type { RedisClientType } from "redis";
export class RedisPendingRegistrationRepository implements IPendingRegistrationRepository {
  constructor(private readonly redisClient: RedisClientType) {}
  private readonly expiresIn = 300;

  async savePendingRegistration(data: PendingRegistrationData): Promise<void> {
    const key = `registration:otp:${data.email}`;
    const stringifiedData = JSON.stringify(data);

    await this.redisClient.set(key, stringifiedData, {
      EX: this.expiresIn,
    });
  }

  async findPendingRegistration(
    email: string,
  ): Promise<PendingRegistrationData | null> {
    return null;
  }

  async deletePendingRegistration(email: string): Promise<void> {
    const key = `registration:otp:${email}`;

    await this.redisClient.del(key);
  }
}
