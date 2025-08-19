import { notesModel } from "../Models/notesModel.js";
import noteQueue from "../Queue.js";

const createNote = async (req, res) => {
    try {
        const { name, body, releaseAt, webHookUrl } = req.body;
        console.log(name)
        if (!name || !body || !releaseAt || !webHookUrl) {
            return res.status(400).json({ success: false, message: "Give valid input" });
        }
        const newNote = new notesModel({
            title: name,
            body,
            releaseAt,
            webHookUrl,
        })
          if (new Date(releaseAt) < new Date()) {
            await noteQueue.add(
                'sendNote',
                { id: newNote._id.toString(), url: newNote.webHookUrl, releaseAt: newNote.releaseAt },
                { attempts: 3 }
            );
        } 
        
        await newNote.save();
        res.status(200).json({ success: true, id: newNote._id });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}
const listNote = async (req, res) => {
    try {
        const { status, page } = req.query;
        const skip = (page - 1) * 20;
        const query = status ? { status } : {};
        const notes = await notesModel.find(query).skip(skip).limit(20);
        res.status(200).json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}
const replayNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Id required" });
        }
        const note = await notesModel.findById(id);
        if (note.status !== 'failed' && note.status !== 'dead') {
            return res.status(400).json({ success: false, message: "Status should be either failed or dead" });
        }
        note.status = 'pending';
        await note.save();

        res.status(200).json({ success: true, note });

    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}

export { createNote, listNote, replayNote }