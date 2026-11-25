import { Router } from "express";
import { container } from "../../../infrastructure/di/container.js";
import type { CustomerAuthController } from "../../controllers/customer/CustomerAuthController.js";
import { TYPES } from "../../../infrastructure/di/types.js";

const customerAuthRouter = Router();
const customerAuthController = container.get<CustomerAuthController>(
  TYPES.CustomerAuthController,
);

customerAuthRouter
  .route("/register/request-otp")
  .post(
    customerAuthController.requestRegistrationOTP.bind(customerAuthController),
  );
customerAuthRouter
  .route("/register/verify-otp")
  .post(
    customerAuthController.verifyRegistrationOTP.bind(customerAuthController),
  );

export default customerAuthRouter;
