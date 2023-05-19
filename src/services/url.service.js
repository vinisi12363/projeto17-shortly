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
    const result = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
    return result;
  } catch (err) {
    return err.message;
  }
};
const findUrlShorted = async (id)=>{
  try {
    const result = await db.query(`SELECT id, "shortUrl" FROM urls WHERE id = $1;`, [id]);
    return result;
  }catch (err){
    return "Error in findShortlyUrl: " + err.message;
  }
}

export default { create, findUrlById, findUrlShorted };
