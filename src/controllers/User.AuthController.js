import authService from '../Services/authService.js'
import bcrypt from 'bcrypt'

export const login = async (req, res) =>{
    const {email , password} = req.body
    if(!email || !password) return res.status(422).send("invalid email or password")

    try{
        const user = await authService.findEmail (email)
        const userIsValid =  await bcrypt.compare(password , user.rows[0].password)
        console.log("USER IS VALID", userIsValid)
        if (!user) return res.status(404).send({message:"user or password are incorrect "})

        if(user.rows[0].length === 0 ) return res.status(400).json({message:"There are no registered users"})
        
        if(!userIsValid) return res.status(401).send({message:"user or password are incorrect"})

        const token = authService.generateWebToken(user.rows[0].id)
        if(userIsValid) return res.status(200).send({token:token })
       
    }catch(err){
        console.log("erro na function login:", err.message)
        res.status(500).json({message:err.message})
       
    } 
   
}


export default {login}