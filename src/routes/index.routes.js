import { Router } from "express"
import register from "./singUp.routes.js"
import login from "./singIn.routes.js"
import shortUrl from './urls.routes.js'


const router = Router()
router.use(register)
router.use(login)
router.use(shortUrl)



export default router