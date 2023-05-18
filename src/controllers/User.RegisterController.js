import registerService from '../services/register.service.js'
import bcrypt from 'bcrypt'

export const create = async (req , res)=>{
    const {name, email, password} = req.body

    if(!name ||  !email || !password) return res.status(400).send({message:"all the fields are required"})

    try{    
        const user = await registerService.create(req.body)
        const [name, id , email] = user.rows[0]
       
        if(!user) return res.status(400).send("Error creating user")
        res.status(201).send({
            message: "user created secessfully",
            id: id,
            name:name,
            email:email,
        })
    }catch(err){
        if (err.status === 409)  return res.status(409).send({ message: "email already registered, please try another email" })
        res.status(500).json({message:err.message})
    }

}

export const findAllUsers = async (req, res) =>{

    try{
        const users = await registerService.findAll()

        if(users.length === 0 ) return res.status(400).json({message:"There are no registered users"})
    
        res.send(users)
    
    }catch(err){
        res.status(500).send(err.message))
    }
   
}

export const findByEmail = async (req , res) => {
    const {email} = req.params

    try {
        const user =  await registerService.findEmail(email)

        res.send(user)
    }catch(err){return res.status(500).json({message:err.message})}
    


}

export const findById = async (req , res) => {
  const {id} = req.params

  try{
    const user = await registerService.findByIdService(id)

  
    res.send(user)
  }catch(err){res.status(500).send({error:err.message})}

}
