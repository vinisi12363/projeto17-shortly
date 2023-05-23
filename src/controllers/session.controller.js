import Jwt from 'jsonwebtoken'
import sessionService from '../services/session.service.js';



export const getUserUrls = async (req, res) => {
  const {id} =  res.locals;
      try {
            const result = await sessionService.getUserByIdWithUrls(id)
            if(result.rowsCount >0){
              console.log(result.rows[0])
            }
            else{
              res.status(400).send("following user aren't posted a url to short...", id)
            }              
          }catch(err){res.status(500).send("ERRO NO GET MOVEMENT", err)}
  }
  