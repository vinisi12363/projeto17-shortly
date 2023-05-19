export default function validateUrl(schema) {
 
    return (req, res, next) => {
        const {url} = req.body
           
        if(!url) return res.status(400).send("error URL Can't be void")
        
        const {error} = schema.validate(req.body, { abortEarly: false })
    
        if (error) {
            console.log('erro no validador')
            return res.status(422).json({message: error.details[0].message})
        }

        next()
    }
}