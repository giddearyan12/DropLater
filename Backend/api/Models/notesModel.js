import mongoose from "mongoose";

const attemptsSchema = new mongoose.Schema({
    at:{type: Date},
    statusCode: {type: Number},
    ok: {type:Boolean},
    error: {type: String}
})

const noteSchema = new mongoose.Schema({
    title:{
        type: String, required: true,
    },
    body: {
        type:String, required: true,
    },
    releaseAt: {
        type:Date, required: true,
    },
    webHookUrl:{ 
        type:String, required: true,
    },
    status:{
        type: String, enum: ["pending", "delivered", "failed", "dead"], default: "pending",
    },
    attempts:{
        type:[attemptsSchema]
    },
    deliveredAt:{
        type:Date, default: null,
    }
})

noteSchema.index({releaseAt:1})
noteSchema.index({status:1})

export const notesModel = mongoose.model.notes || mongoose.model('notes', noteSchema);