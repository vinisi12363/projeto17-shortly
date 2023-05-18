import { ObjectId } from "mongodb";
import Transaction from "../Model/Transaction.js";


export const recordTransaction = (body)=> Transaction.create(body)

export const getUserMovement = (userIdent) =>Transaction.find({userIdent:userIdent}) 



export default { recordTransaction, getUserMovement}