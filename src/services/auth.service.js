import  User from '../Model/User.js'
import  jwt  from 'jsonwebtoken'

const findUser = (email) => User.findOne({email:email}).select("+password ")

const generateWebToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86000})

export default {findUser , generateWebToken}