import dotenv from "dotenv";
dotenv.config();
export const checkAuthorization = async(req, res, next)=>{
    try {
        const authorizaed = req.headers['authorization'];
        if(!authorizaed){
           return  res.status(400).json({message:"You are not authorized"});
        }
        const splitted = authorizaed.split(' ');
        const token = splitted[1];
        if(token !== process.env.TOKEN){
           return res.status(400).json({message:"You are not authorized"});
        }
        next();

    } catch (error) {
        res.status(500).json({error});

    }
}