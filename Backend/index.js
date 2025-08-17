import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import noteRouter from './Routes/noteRouter.js';

const app = express()
const port = 8000
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/droplater').then(()=>{
    console.log("MongoDB Connected")
}).catch((err)=>{
    console.log(err);
})

app.use('/api', noteRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
