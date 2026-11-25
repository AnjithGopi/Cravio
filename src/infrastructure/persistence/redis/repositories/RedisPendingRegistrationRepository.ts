import { injectable, inject } from "inversify";
import type { PendingRegistrationData } from "../../../../application/dto/user/PendingRegistrationData.js";
import type { IPendingRegistrationRepository } from "../../../../application/interfaces/repositories/IPendingRegistrationRepository.js";
import type { RedisClientType } from "redis";
import { TYPES } from "../../../di/types.js";

@injectable()
export class RedisPendingRegistrationRepository implements IPendingRegistrationRepository {
  constructor(
    @inject(TYPES.RedisClient)
    private readonly redisClient: RedisClientType,
  ) {}
  private readonly keyString = "registration:otp:";
  private readonly expiresIn = 300;

  private generateKey(email: string) {
    return this.keyString + email;
  }

  async savePendingRegistration(data: PendingRegistrationData): Promise<void> {
    const key = this.generateKey(data.email);
    const stringifiedData = JSON.stringify(data);

    await this.redisClient.set(key, stringifiedData, {
      EX: this.expiresIn,
    });
  }

  async findPendingRegistration(
    email: string,
  ): Promise<PendingRegistrationData | null> {
    const key = this.generateKey(email);
    const pendingRegistrationData = await this.redisClient.get(key);

    if (pendingRegistrationData === null) {
      return null;
    }

    const parsedData = JSON.parse(
      pendingRegistrationData,
    ) as PendingRegistrationData;

    return parsedData;
  }

  async deletePendingRegistration(email: string): Promise<void> {
    const key = this.generateKey(email);
    await this.redisClient.del(key);
  }

  async incrementFailedAttempts(email: string): Promise<number | null> {
    const key = this.generateKey(email);
    const pendingRegistrationData = await this.redisClient.get(key);

    return null;
  }
}
