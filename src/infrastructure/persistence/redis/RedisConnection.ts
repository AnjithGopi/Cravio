import { createClient } from "redis";

export class RedisConnection {
  private readonly client = createClient({
    url: process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
  });

  constructor() {
    this.client.on("error", (error) => {
      console.error(`Redis client error:${error}`);
    });
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  getClient() {
    return this.client;
  }
}
