export class AppError extends Error {
  constructor(
    message: string,
    public readonly errorCode: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}
