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
    try{
         const result = await urlService.findUrlById(id)

        if(!result.rows.length) return res.status(400).json({message:"There are no registered URLS with this ID"})
    
        res.status(200).send(result.rows[0])
    
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
   
}


export const getShortlyUrl = async  (res, req)=>{
    const {shortUrl} =  req.params
    try{
        const result = await urlService.findShortlyUrl(shortUrl)

        if(!result.rows.length) return res.status(400).json({message:"There are no registered URLS with this ID"})
    
        res.redirect(result.rows[0].url)
    
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }


} 
