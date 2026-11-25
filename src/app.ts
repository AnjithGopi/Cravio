import express from "express";
import customerAuthRouter from "./presentation/routes/customer/customerAuthRoutes.js";
import { errorHandler } from "./presentation/middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/customer/auth", customerAuthRouter);

app.use(errorHandler);

export default app;
