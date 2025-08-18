import { Queue } from "bullmq";
import redis from "./redis.js";

const noteQueue = new Queue('note',{
    connection: redis,
})


export default noteQueue;