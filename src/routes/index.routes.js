import { Router } from "express"
import register from "./singUp.routes.js"
import login from "./singIn.routes.js"

const router = Router()
router.use(register)
router.use(login)



export default router