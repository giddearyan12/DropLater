import { createHash } from 'crypto';
import axios from 'axios';
import redis from './redis.js';
import { Worker } from 'bullmq';
import { notesModel } from './Models/notesModel.js';

export const worker = new Worker('note', async (job) => {

    const note = await notesModel.findById(job.data.id);
    try {
        const response = await axios.post(note.webHookUrl, {}, {
            headers: {
                X_Note_Id: note._id,
                X_Idempotency_Key: createHash('sha256').update(note._id + note.releaseAt).digest('base64'),
            }
        })
        console.log(response.data.ok)
        if (response.data.ok) {
            note.status = 'delivered'
            note.deliveredAt = new Date();
            const toPush = {
                at: new Date(),
                statusCode: response.status,
                ok:response.data.ok,
            }
            note.attempts.push(toPush);
            note.save();
        }
    } catch (error) {
        console.log('err')
        const toPush = {
                at: new Date(),
                statusCode: response.status,
                ok:response.data.ok,
                error: error,
            }
            note.attempts.push(toPush);

    }


}, { connection: redis });

worker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} failed:`, err);
});


