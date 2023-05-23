import urlService from '../services/url.service.js'





export const create = async (req , res)=>{
    const {id} =  res.locals;
    const {url} = req.body;   
    if(!id) return res.status(401).send("unauthorized")
    if(!url) return res.status(400).send({message:" the fiel URL are required"})
    try{  

                 const result =  await urlService.create(url,id)
                 console.table(result.rows[0])
                 if(!result)return res.status(400).send("error in request create url controller")
                 return res.status(201).send(result.rows[0]) 
        
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
    const {idf} = req.params;
    const {id} =  res.locals;
    if(!id) return res.status(401).send(" unauthorized ")
    if(!idf) return res.status(422).send(" the ID are required")
    try{
        
            const result = await urlService.deleteUrlById(idf)
            console.log("delete result" , result)
            if (result.rowCount>0) {
                res.status(200).send("url deleted")
            }    else {
                return res.status(400).json({message:"There are no registered URLS with this ID"})
            }
    
     
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }

}