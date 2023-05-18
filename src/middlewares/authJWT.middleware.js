import  Jwt from "jsonwebtoken";
import {findUserID} from '../Services/sessionService.js'
import dotenv from 'dotenv'
dotenv.config()


export const authJWT =  (req , res , next)=>{
   
    try{
        
        const {authorization} = req.headers
        const parts = authorization.split(" ")
        const [schema , token] = parts 
        let result=''
        if (parts === undefined) return res.status(401)

        if(!authorization)  return res.status(401)
    
        if(parts.length !== 2)  return res.status(401)
    
        if(schema !== 'Bearer') return res.status(401)

        Jwt.verify(token, process.env.SECRET_JWT , async (err, decoded )=>{
            if(err) return res.status(401).send({message:"Token invalid"})
            if (decoded) {
                          
                result = await findUserID(decoded.id)
                console.log(result)
                if(!result || !result.id){
                    return res.status(401).send({message:"Token invalid"})
                }
            }
           
        })
        
        req.userId = result.id   
        next();
    }catch(err){res.status(500).send({message:err.message})}
}


export default {authJWT}