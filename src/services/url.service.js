import { db } from '../config/database.config.js';
import { nanoid } from 'nanoid';

const create = async (url,userId) => {
  const shortUrl = nanoid(8);
  try {
    const result = await db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2,$3) RETURNING id, "shortUrl";`, [url, shortUrl,userId]);

    return result;
  } catch (err) {
    return "Error in create URL: " + err.message;
  }
};

const findUrlById = async (id) => {
  try {
    const result = await db.query(`SELECT id, "shortUrl" , url  FROM urls WHERE id = $1;`, [id]);
    return result;
  } catch (err) {
    return err.message;
  }
};
const findShortlyUrl = async (shortUrl)=>{
  try {
    const result = await db.query(`SELECT id , url FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
    return result;
  }catch (err){
    return "Error in findShortlyUrl: " + err.message;
  }

}

const updateVisitCount = async (id)=>{
  try {
    const result = await db.query(`UPDATE urls SET "visitCount" = COALESCE("visitCount", 0) + 1 WHERE id = $1;
    `, [id]);

    return result;
  }catch (err){
    return "Error in visitcount Increment: " + err.message;
  }

}
const findUrlShortedById = async (id)=>{
  try {
    const result = await db.query(`SELECT url "shortUrl" FROM urls WHERE id = $1;`, [id]);
    return result;
  }catch (err){
    return "Error in findUrlShorted: " + err.message;
  }
}
const deleteUrlById = async (id) => {
  try {
    const result = await db.query(`DELETE FROM urls WHERE id = $1 RETURNING url;`, [id]);
    return result;
  } catch (err) {
    return "Error in deleteUrlById: " + err.message;
  }
};




export default { create, findUrlById, findUrlShortedById ,findShortlyUrl, updateVisitCount, deleteUrlById };
