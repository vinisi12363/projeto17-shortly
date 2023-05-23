import { db } from "../config/database.config.js"


export const findUserID = async (id) =>  {
    try{
        const result = await db.query (`SELECT * from users WHERE id=$1`, id)
        return result
    }catch(err){
        return err.message
    }
} 

const getUserByIdWithUrls = async (id)=>{

    try {
       const result = await db.query(`SELECT
       u.id,
       u.name,
       SUM(ur."visitCount") AS "visitCount",
       json_agg(json_build_object(
         'id', ur.id,
         'shortUrl', ur."shortUrl",
         'url', ur.url,
         'visitCount', ur."visitCount"
       )) AS "shortenedUrls"
     FROM users u
     JOIN urls ur ON u.id = ur."userId"
     WHERE u.id = $1
     GROUP BY u.id, u.name;`,
     [id]
   );
  
       return result;
    }catch (err){
      return err.message;
    }
  
  
  }


export default {getUserByIdWithUrls ,findUserID}