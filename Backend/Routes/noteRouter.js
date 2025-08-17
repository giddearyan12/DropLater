import express from 'express';
import { createNote, listNote } from '../Controllers/noteController.js';

const noteRouter = express.Router();

noteRouter.get('/notes',listNote);
noteRouter.post('/notes',createNote);

export default noteRouter;