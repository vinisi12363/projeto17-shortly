import Jwt from 'jsonwebtoken'



export const getUserUrls = async (req, res) => {
    const {authorization} = req.headers
    const parts = authorization.split(" ")
    const [schema , token] = parts    
    
      try {
        
        Jwt.verify(token, process.env.SECRET_JWT , async (err, decoded )=>{
          if(err) return res.status(401).send({message:"Token invalid"})
          if (decoded) {
               const userIdent = decoded.id
               console.log(userIdent)
             //  const movement =  await getUserMovement(userIdent)

             //  if (!movement) return res.send([])
              // res.status(201).send()
      
          }
        })
  
      }catch(err){res.status(500).send("ERRO NO GET MOVEMENT", err)}
  }
  