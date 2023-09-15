import "dotenv/config";

export default {
  ENV: process.env.NODE_ENV ?? "development",
  PORT: process.env.PORT ?? 8000,
  REDIS_HOST: process.env.REDIS_HOST ?? "localhost",
  REDIS_PORT: process.env.REDIS_PORT ?? 6379,
  DATABASE_URI: process.env.DATABASE_URI ?? "mongodb://localhost:27017",
  DATABASE_NAME: process.env.DATABASE_NAME ?? "test",
  DATABASE_USER: process.env.DATABASE_USER ?? "root",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? "root",
  AUTH_PUBLIC_KEY: process.env.AUTH_PUBLIC_KEY ?? "",
};
