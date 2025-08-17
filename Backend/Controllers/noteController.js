import { notesModel } from "../Models/notesModel.js";

const createNote =async(req, res)=>{
    try {
        console.log('hello')
        const {title, body, releaseAt, webHookUrl} =req.body;
        if(!title || !body || !releaseAt || !webHookUrl){
            res.status(400).json({success:false, message:"Give valid input"});
        }
        const newNote = new notesModel({
            title,
            body,
            releaseAt,
            webHookUrl,
        })

        await newNote.save();
        res.status(200).json({success:true, id: newNote._id});
    } catch (error) {
        res.status(500).json({success:false, error});
    }
}
const listNote =async(req, res)=>{ 
    try {
        const {status, page} =req.query;
        const skip = (page-1)*20;
        const notes = await notesModel.find({status}).skip(skip).limit(20);
        res.status(200).json({success:true, notes});
    } catch (error) {
        res.status(500).json({success:false, error});
    }
}

export {createNote, listNote}