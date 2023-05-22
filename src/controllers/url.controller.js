import urlService from '../services/url.service.js'


export const create = async (req , res)=>{
    const {url} = req.body

    if(!url) return res.status(400).send({message:" the fiel URL are required"})
    try{    
        const result =  await urlService.create(req.body)
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
    console.log ("id", id )
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

    try{
        const result = await urlService.findShortlyUrl(sUrl)

        if(result) {
            res.redirect(result.rows[0].url)
        } 
        else {
            return res.status(404).json({message:"There are no registered URLS with this shortUrl"})
    
        }
       
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }


} 

export const  deleteUrlById  = async (req  , res ) => {
    const {id} = req.params;

    try{
        const result = await urlService.deleteUrlById(id)
        if (result) {
            res.status(200).send("url deleted")
        }    else {
            return res.status(400).json({message:"There are no registered URLS with this ID"})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }

}