
import {db} from '../config/database.config.js'


const create = async (body) => {
    
     const [name , email, password ] = body
     await db.query(`INSERT INTO users (
            name , 
            email, 
            password
         ) VALUES ( $1, $2, $3);` 
         , [name, email , password])
} 

const getAll = async() => {
    await db.query(`SELECT * FROM users;`)
}

const findEmail = async (email) => {
    await db.query(`SELECT * FROM users WHERE email = $1;`,[email])
}

const findByIdService = async (id) => {
    await db.query(`SELECT * FROM users WHERE id = $1;`,[id])
}

export default {create, getAll, findEmail, findByIdService}