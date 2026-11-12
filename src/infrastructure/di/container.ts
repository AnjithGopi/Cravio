import { Container } from "inversify";
import { TYPES } from "./types.js";
import type { IOTPService } from "../../application/interfaces/services/IOTPService.js";
import { CryptoOTPService } from "../services/CryptoOTPService.js";
import type { IPasswordService } from "../../application/interfaces/services/IPasswordService.js";
import { BcryptPasswordService } from "../services/BcryptPasswordService.js";
import type { IEmailService } from "../../application/interfaces/services/IEmailService.js";
import { NodemailerEmailService } from "../services/EmailService.js";
import type { IPendingRegistrationRepository } from "../../application/interfaces/repositories/IPendingRegistrationRepository.js";
import { RedisPendingRegistrationRepository } from "../persistence/redis/repositories/RedisPendingRegistrationRepository.js";
import { RequestRegistrationOTPUseCase } from "../../application/use-cases/user/RequestRegistrationOTPUseCase.js";
import type { IUserRepository } from "../../application/interfaces/repositories/IUserRepository.js";
import { UserRepository } from "../persistence/mongodb/repositories/UserRepository.js";
import { CustomerAuthController } from "../../presentation/controllers/customer/CustomerAuthController.js";
import type { RedisClientType } from "@redis/client";
import { RedisConnection } from "../persistence/redis/RedisConnection.js";

const redisConnection = new RedisConnection();
const redisClient = redisConnection.getClient();
const container = new Container();

container.bind<IOTPService>(TYPES.IOTPService).to(CryptoOTPService);
container
  .bind<IPasswordService>(TYPES.IPasswordService)
  .to(BcryptPasswordService);
container.bind<IEmailService>(TYPES.IEmailService).to(NodemailerEmailService);
container
  .bind<IPendingRegistrationRepository>(TYPES.IPendingRegistrationRepository)
  .to(RedisPendingRegistrationRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

container
  .bind<RequestRegistrationOTPUseCase>(TYPES.RequestRegistrationOTPUseCase)
  .toDynamicValue((context) => {
    const pendingRepository = context.get<IPendingRegistrationRepository>(
      TYPES.IPendingRegistrationRepository,
    );
    const userRepository = context.get<IUserRepository>(TYPES.IUserRepository);
    const passwordService = context.get<IPasswordService>(
      TYPES.IPasswordService,
    );
    const otpService = context.get<IOTPService>(TYPES.IOTPService);
    const emailService = context.get<IEmailService>(TYPES.IEmailService);

    return new RequestRegistrationOTPUseCase(
      pendingRepository,
      userRepository,
      passwordService,
      otpService,
      emailService,
    );
  });
container
  .bind<CustomerAuthController>(TYPES.CustomerAuthController)
  .toDynamicValue((context) => {
    const requestRegistrationOTPUseCase =
      context.get<RequestRegistrationOTPUseCase>(
        TYPES.RequestRegistrationOTPUseCase,
      );
    return new CustomerAuthController(requestRegistrationOTPUseCase);
  });
container.bind<RedisClientType>(TYPES.RedisClient).toConstantValue(redisClient);

export { container, redisConnection };
