import { Router } from "express"
import register from "./singUp.routes.js"


const router = Router()
router.use(register)



export default router