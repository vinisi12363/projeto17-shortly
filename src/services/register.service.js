
import {db} from '../config/database.config.js'


const create = async (body) => {

    const {name , email, password } = body;
    try {
       
        const result = await db.query(`INSERT INTO users (
               name, 
               email, 
               password
            ) VALUES ( $1, $2, $3);` 
            , [name, email , password])
   
        return  result
    } catch (err) {
        return err.message 
    }
     
   
} 

const getAll = async() => {
    try {
        const result =  await db.query(`SELECT * FROM users;`)
        return  result 
    } catch (err) {
        return err.message 
    }
   

}

const findEmail = async (email) => {
    try {
        const result = await db.query(`SELECT * FROM users WHERE email = $1;`,[email])
        return result
    } catch (err) {
        return err.message 
    }

}

const findByIdService = async (id) => {
    try {
        const result =  await db.query(`SELECT * FROM users WHERE id = $1;`,[id])
        return result
    } catch (err) {
        return err.message 
    }
   
}

export default {create, getAll, findEmail, findByIdService}