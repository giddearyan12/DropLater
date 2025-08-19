import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import noteRouter from './Routes/noteRouter.js';
import { rateLimit } from 'express-rate-limit'
import { checkAuthorization } from './authMiddleware.js';
import { producer } from './producer.js';
import './worker.js'
const app = express()
const port = 8000
app.use(cors({
	origin:'http://localhost:5173'
}));
app.use(express.json())

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	limit: 60, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})

app.use(limiter)

mongoose.connect('mongodb://localhost:27017/droplater').then(()=>{
    console.log("MongoDB Connected")
}).catch((err)=>{
    console.log(err);
})

app.use('/api',checkAuthorization, noteRouter)
app.get('/health',async(req, res)=>{
    res.json({ok:true})
})

setInterval(() => {
  producer();
}, 5000);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
