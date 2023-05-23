import Jwt from 'jsonwebtoken'
import sessionService from '../services/session.service.js';



export const getUserUrls = async (req, res) => {
  const {id} =  res.locals;
      try {
            const result = await sessionService.getUserByIdWithUrls(id)
            console.log("RESULT", result)
            if(result){
              console.log(result.rows[0])
              res.status(201).send (result.rows[0])
            }
            else{
              return res.status(400).send("following user aren't posted a url to short...")
            }              
          }catch(err){res.status(500).send("ERRO NO GET MOVEMENT")}
  }
  
  export default {getUserUrls}