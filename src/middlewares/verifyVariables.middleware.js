import registerService from "../Services/registerService.js"


const verifyVariables = async (req, res, next) => {

    const { email, name , password} = req.body
    if(!email || !name || !password) return res.status(422).send({message:'existem campos invalidos'})
    if (password.length<3) return res.status(422).send({message:'existem campos invalidos'})
    try {
        const user = await registerService.findEmail(email)

        if (email === user.email) {
            return res.status(409).send({ message: "email already registered, please try another email" })
        }
        else {
            next()
        }
    } catch (err) {
        if(err.message.includes("E11000 duplicate key error"))
        
        return res.status(500).send({ message: err.message }) 
    
    }



}

export default verifyVariables