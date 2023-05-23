import  Jwt from "jsonwebtoken";
import sessionService from '../services/session.service.js'
import dotenv from 'dotenv'
dotenv.config()

import { verify } from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    
    res.locals = {
      id: decoded.id
    };
   
    next();
  });
};

export default verifyJWT;