import {Redis} from 'ioredis';

const redis = new Redis({
  host: "localhost", 
  port: 6379,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => console.log("Connected to Redis"));
redis.on("error", (err) => console.error("Redis error", err));

export default redis;