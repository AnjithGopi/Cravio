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
  private readonly keyPrefix = "registration:otp:";
  private readonly expiresIn = 180;
  private readonly incrementFailedAttemptsScript = `local exists =redis.call("EXISTS",KEYS[1])
    if exists==0 then 
    return nil
    end 
    return redis.call("HINCRBY",KEYS[1],"failedAttempts,1")`;

  private generateKey(email: string) {
    return this.keyPrefix + email;
  }

  async savePendingRegistration(data: PendingRegistrationData): Promise<void> {
    const key = this.generateKey(data.email);

    await this.redisClient
      .multi()
      .hSet(key, {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        passwordHash: data.passwordHash,
        otpHash: data.otpHash,
        failedAttempts: data.failedAttempts,
      })
      .expire(key, this.expiresIn)
      .exec();
  }

  async findPendingRegistration(
    email: string,
  ): Promise<PendingRegistrationData | null> {
    const key = this.generateKey(email);
    const pendingRegistrationData = await this.redisClient.hGetAll(key);

    const {
      name,
      email: storedEmail,
      mobile,
      passwordHash,
      otpHash,
      failedAttempts,
    } = pendingRegistrationData;

    if (
      !name ||
      !storedEmail ||
      !mobile ||
      !passwordHash ||
      !otpHash ||
      !failedAttempts
    ) {
      return null;
    }

    const attemptCount = Number(failedAttempts);
    if (!Number.isInteger(attemptCount) || attemptCount < 0) {
      return null;
    }

    return {
      name,
      email: storedEmail,
      mobile,
      otpHash,
      passwordHash,
      failedAttempts: attemptCount,
    };
  }

  async deletePendingRegistration(email: string): Promise<void> {
    const key = this.generateKey(email);
    await this.redisClient.del(key);
  }

  async incrementFailedAttempts(email: string): Promise<number | null> {
    const key = this.generateKey(email);

    const result = await this.redisClient.eval(
      this.incrementFailedAttemptsScript,
      {
        keys: [key],
        arguments: [],
      },
    );

    if (result === null) {
      return null;
    }

    if (typeof result !== "number") {
      throw new Error("Unexpected redis script response");
    }

    return result;
  }
}
