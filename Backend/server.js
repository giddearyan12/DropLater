import express from 'express'
const app = express()
import redis from './redis.js'
const port = 3000

app.post('/', async(req, res) => {
  try {
    const key = req.headers['x_idempotency_key'];
    console.log(key)
    if(!key){
        return res.status(400).json({ok: false,message:"Key not present"})
    }
    const xyz = await redis.set(key, 1, 'NX', 'EX', 86400);
    console.log(xyz)
    if(!xyz){
        return res.status(200).json({ ok: true, message: 'Duplicate ignored' })
    }
    res.status(200).json({ok:true})
  } catch (error) {
    res.status(500).json({ok:false, message:error})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
