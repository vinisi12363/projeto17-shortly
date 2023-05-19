import  User from '../Model/User.js'
import  jwt  from 'jsonwebtoken'

const findUser = (email) => User.findOne({email:email}).select("+password ")

const findEmail = async (email) => {
    try {
        const result = await db.query(`SELECT email, password FROM users WHERE email = $1;`,[email])
        return result
    } catch (err) {
        return err.message 
    }

}

const updateUserToken = async (email, token) => {
    try {
        const result = await db.query(`UPDATE users SET 
        "refreshToken"  = '$1'
         WHERE email = '$2'
        `,[token,email])
        return result
    } catch (err) {
        return err.message 
    }
}

const generateWebToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 24*60*60*1000})

export default {findUser , generateWebToken , findEmail, updateUserToken}