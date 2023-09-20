import redisClient from "../redis.js";

async function setJSON<T, _>(path: string, skill: T): Promise<void> {
  await redisClient.call("JSON.SET", path, "$", JSON.stringify(skill));
}

async function getJSON<T, _>(path: string): Promise<T | null> {
  try {
    const data = (await redisClient.call("JSON.GET", path, "$")) as string;
    if (!data) return null;
    const [skill] = JSON.parse(data);
    return skill;
  } catch (err) {
    throw err;
  }
}

export { setJSON, getJSON };
