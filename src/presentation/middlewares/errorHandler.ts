import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../application/errors/AppError.js";
import { StatusCodes } from "http-status-codes";
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AppError && Object.hasOwn(errorStatusMap, err.errorCode)) {
    const statusCode =
      errorStatusMap[err.errorCode] ?? StatusCodes.INTERNAL_SERVER_ERROR;

    res
      .status(statusCode)
      .json({ success: false, errorCode: err.errorCode, message: err.message });
    return;
  }
  console.error(err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: "Internal Server Error " });
};

const errorStatusMap: Record<string, number> = {
  INVALID_OTP: StatusCodes.BAD_REQUEST,
  REGISTRATION_EXPIRED: StatusCodes.GONE,
  EMAIL_ALREADY_EXISTS: StatusCodes.CONFLICT,
  MOBILE_ALREADY_EXISTS: StatusCodes.CONFLICT,
};
