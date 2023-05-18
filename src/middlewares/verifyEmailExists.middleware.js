import registerService from "../Services/registerService.js"


const verifyEmailExists = async (req, res, next) => {

    const { email , password} = req.body
    if(!email ||  !password) return res.status(422).send({message:'existem campos invalidos'})
    if (password.length<3) return res.status(422).send({message:'existem campos invalidos'})
    if(typeof email !== 'string'  || typeof password !== 'string')  return res.status(422).send({message:'existem campos invalidos'})
    try {
        const user = await registerService.findEmail(email)

        if (email === user.email) {
            return res.status(409).send({ message: "email already registered, please try another email" })
        }
        else {
            next()
        }
    } catch (err) { return res.status(500).send({ message: err.message }) }



}

export default verifyEmailExists