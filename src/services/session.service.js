import  User from '../Model/User.js'


export const findUserID = (id) =>  User.findOne({_id:id}) 


export default {findUserID}