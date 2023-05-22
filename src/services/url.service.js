import { db } from '../config/database.config.js';
import { nanoid } from 'nanoid';

const create = async (body) => {
  const { url } = body;
  const shortUrl = nanoid(8 , url);
  try {
    const result = await db.query(`INSERT INTO urls (url, "shortUrl") VALUES ($1, $2) RETURNING id, "shortUrl";`, [url, shortUrl]);

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
    const result = await db.query(`SELECT url FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
    return result;
  }catch (err){
    return "Error in findShortlyUrl: " + err.message;
  }

}

const updateVisitCount = async (id)=>{
  try {
    const result = await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1;`, [id]);

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


const ranking = async ()=>{

  try {
     const result = await db.query(`SELECT 
     users.id, 
     users.name, 
     COUNT(urls.id) AS "linksCount",
     COALESCE(SUM(urls."visitCount"), 0) AS "visitCount" FROM users LEFT  JOIN urls ON users.id = "urls.userId" 
     GROUP BY users.id 
     ORDER BY "visitCount" DESC 
     LIMIT 10;`)

     return result;
  }catch (err){
    return err.message;
  }


}

export default { ranking ,create, findUrlById, findUrlShortedById ,findShortlyUrl, updateVisitCount, deleteUrlById };
