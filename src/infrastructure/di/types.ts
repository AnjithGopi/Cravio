export const TYPES = {
  CustomerAuthController: Symbol.for("CustomerAuthController"),
  RequestRegistrationOTPUseCase: Symbol.for("RequestRegistrationOTPUseCase"),
  IOTPService: Symbol.for("IOTPService"),
  IPasswordService: Symbol.for("IPasswordService"),
  IEmailService: Symbol.for("IEmailService"),
  IPendingRegistrationRepository: Symbol.for("IPendingRegistrationRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  RedisClient: Symbol.for("RedisClient"),
} as const;
