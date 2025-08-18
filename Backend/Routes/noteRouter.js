import express from 'express';
import { createNote, listNote, replayNote } from '../Controllers/noteController.js';

const noteRouter = express.Router();

noteRouter.get('/notes',listNote);
noteRouter.post('/notes',createNote);
noteRouter.post('/notes/:id/replay',replayNote);

export default noteRouter;