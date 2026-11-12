import { connectDatabase } from "./infrastructure/persistence/mongodb/connection/connectDatabase.js";
import { redisConnection } from "./infrastructure/di/container.js";
import app from "./app.js";

async function startServer(): Promise<void> {
  try {
    const port = process.env.PORT;
    await Promise.all([connectDatabase(), redisConnection.connect()]);
    app.listen(port, () => {
      console.log(`Cravio server running on ${port}`);
    });
  } catch (error) {
    console.error(`Error in starting server${error}`);
    process.exit(1);
  }
}

startServer();
