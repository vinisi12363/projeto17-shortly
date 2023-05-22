import registerService from '../services/register.service.js'
import bcrypt from 'bcrypt'

export const create = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required." });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords don't match." });
    }
  
    const lowerEmail = email.toLowerCase();
  
    try {
      const emailResult = await registerService.findEmail(lowerEmail)
   
  
      if (emailResult.rowCount > 0) {
        return res
          .status(409)
          .send({ message: "Email already registered. Please try another email." });
      }
  
      await registerService.create({
        name: name,
        email: lowerEmail,
        password: password,
        confirmPassword: confirmPassword,
      });
  
      res.status(201).send("User created successfully.");
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
export const findAllUsers = async (req, res) => {

    try {
        const users = await registerService.getAll()
        console.log('users', users)
        if (!users) return res.status(400).json({ message: "There are no registered users" })

        res.send(users.rows)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }

}

export const findByEmail = async (req, res) => {
    const { email } = req.params

    try {
        const user = await registerService.findEmail(email)

        res.send(user)
    } catch (err) { return res.status(500).json({ message: err.message }) }



}

export const findById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await registerService.findByIdService(id)


        res.send(user)
    } catch (err) { res.status(500).send({ error: err.message }) }

}
