import Redis from "ioredis";
import "dotenv/config";

export const redisHelper = {
  client: null as unknown as Redis,
  connect() {
    this.client = new Redis(process.env.REDIS_URL as string);
  },
};
