import express from "express";
import customerAuthRouter from "./presentation/routes/customer/customerAuthRoutes.js";

const app = express();

app.use(express.json());
app.use('/api/customer/auth',customerAuthRouter)

export default app;
