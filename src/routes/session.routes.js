import express from 'express'
import  {getUserUrls} from '../controllers/session.controller.js'
import verifyJWT from '../middlewares/authJWT.middleware.js'

const router = express.Router()
router.use(verifyJWT)
router.get('/users/me', getUserUrls);
export default router