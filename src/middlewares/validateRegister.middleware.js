
export default function validateRegister(schema) {
 
    return (req, res, next) => {
        const { email, password, name, confirmPassword } = req.body
           
        if(!email || !password || !name || !confirmPassword) return res.status(400).send('error in the structure')
        
        const {error} = schema.validate(req.body, { abortEarly: false })
    
        if (error) {
            
            return res.status(400).json({message: error.details[0].message})
        }

        next()
    }
}