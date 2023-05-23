import { Router } from "express"
import register from "./singUp.routes.js"
import login from "./singIn.routes.js"
import shortUrl from './urls.routes.js'
import users from './session.routes.js'
import ranking from './ranking.routes.js'

const router = Router()

router.use(ranking)
router.use(register)
router.use(login)
router.use(shortUrl)
router.use(users)


export default router