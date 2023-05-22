import urlService from '../services/url.service.js'
import Jwt from 'jsonwebtoken'




export const create = async (req , res)=>{

    const {url} = req.body
    const {authorization} = req.headers
    const parts = authorization.split(" ")
    const [schema , token] = parts    

    if(!url) return res.status(400).send({message:" the fiel URL are required"})
    try{  
        Jwt.verify(token, process.env.SECRET_JWT , async (err, decoded )=>{
            if(err) return res.status(401).send({message:"Token invalid"})
            if (decoded) {
                 const userIdent = decoded.id
                 console.log(userIdent)
                 const result =  await urlService.create(req.body)
                 console.table(result.rows[0])
                 if(!result)return res.status(400).send("error in request create url controller")
                 return res.status(201).send(result.rows[0]) 
        
            }
          })
      
   
        
    }catch(err){  
        const errorMessage = "controller create error " + err.message
        res.status(500).send(errorMessage)
    }

}

export const findUrlById = async (req, res) =>{
   
    const {id} = req.params
    try{
         const result = await urlService.findUrlById(id)
        if(result) {
            res.status(200).send(result.rows[0].url)
        } 
        else { return res.status(400).json({message:"There are no registered URLS with this ID"})
        }
       
    
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
   
}


export const getShortlyUrl = async  (req, res)=>{
    const {sUrl} =  req.params
    if(!sUrl) return res.status(422).send(" the shortly url are required")
    try{  
       
                const result = await urlService.findShortlyUrl(sUrl)
                if(result) {
                    await urlService.updateVisitCount(result.rows[0].id)
                    
                } 
                else {
                    return res.status(404).json({message:"There are no registered URLS with this shortUrl"})
            
                }
                 if(!result)return res.status(400).send("error in request create url controller")
               
                 res.redirect(result.rows[0].url)
            
    }catch(err){  
        const errorMessage = "controller findShorltUrl " + err.message
        res.status(500).send(errorMessage)
    }
    

} 
export const  deleteUrlById  = async (req  , res ) => {
    const {id} = req.params;
    const {authorization} = req.headers
    const parts = authorization.split(" ")
    const [schema , token] = parts    

    if(!id) return res.status(422).send(" the ID are required")
    try{
        Jwt.verify(token, process.env.SECRET_JWT , async (err, decoded )=>{
            if(err) return res.status(401).send({message:"Token invalid"})
            if (decoded) {
                    const result = await urlService.deleteUrlById(id)
                    if (result) {
                        res.status(200).send("url deleted")
                    }    else {
                        return res.status(400).json({message:"There are no registered URLS with this ID"})
                    }
                
            }
     })
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }

}