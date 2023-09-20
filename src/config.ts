import "dotenv/config";

const {
  NODE_ENV,
  PORT,
  BACKEND_URL,
  AUTH_PUBLIC_KEY,
  DATABASE_URI,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  TEST_DATABASE_URI,
  TEST_DATABASE_NAME,
  TEST_DATABASE_USER,
  TEST_DATABASE_PASSWORD,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
  TEST_REDIS_USERNAME,
  TEST_REDIS_PASSWORD,
  TEST_REDIS_HOST,
  TEST_REDIS_PORT,
} = process.env;

const databaseInfo = () => {
  if (NODE_ENV === "test") {
    return {
      DATABASE_URI: TEST_DATABASE_URI ?? "",
      DATABASE_NAME: TEST_DATABASE_NAME ?? "",
      DATABASE_USER: TEST_DATABASE_USER ?? "",
      DATABASE_PASSWORD: TEST_DATABASE_PASSWORD ?? "",
    };
  }
  return {
    DATABASE_URI: DATABASE_URI ?? "",
    DATABASE_NAME: DATABASE_NAME ?? "",
    DATABASE_USER: DATABASE_USER ?? "",
    DATABASE_PASSWORD: DATABASE_PASSWORD ?? "",
  };
};

const redisInfo = () => {
  if (NODE_ENV === "test") {
    return {
      REDIS_USERNAME: TEST_REDIS_USERNAME ?? "",
      REDIS_PASSWORD: TEST_REDIS_PASSWORD ?? "",
      REDIS_HOST: TEST_REDIS_HOST ?? "",
      REDIS_PORT: TEST_REDIS_PORT ?? "",
    };
  }
  return {
    REDIS_USERNAME: REDIS_USERNAME ?? "",
    REDIS_PASSWORD: REDIS_PASSWORD ?? "",
    REDIS_HOST: REDIS_HOST ?? "",
    REDIS_PORT: REDIS_PORT ?? "",
  };
};

export default {
  ENV: NODE_ENV ?? "development",
  PORT: PORT ?? 8000,
  BACKEND_URL: BACKEND_URL ?? "http://localhost:8000",
  AUTH_PUBLIC_KEY: AUTH_PUBLIC_KEY ?? "",
  ...redisInfo(),
  ...databaseInfo(),
};
