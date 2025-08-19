import { notesModel } from "./Models/notesModel.js";
import noteQueue from "./Queue.js";


const producer = async () => {
    const currTime = new Date();
    const notes = await notesModel.find({ releaseAt: { $lte: currTime }, status: 'pending' });
    notes.map(async (note) => {
        const job = await noteQueue.add('sendNote', { id: note._id.toString(), url: note.webHookUrl, releaseAt: note.releaseAt },{
        attempts: 3,
      });
        console.log('Job added:', job.id, job.data);
    })
}



export {producer}
