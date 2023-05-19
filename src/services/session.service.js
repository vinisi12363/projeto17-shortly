import { db } from "../config/database.config"


export const findUserID = async (id) =>  {
    try{
        const result = await db.query (`SELECT * from users WHERE id=$1`, id)
        return result
    }catch(err){
        return err.message
    }
} 


export default {findUserID}