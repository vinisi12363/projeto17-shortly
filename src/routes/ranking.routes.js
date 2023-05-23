import {getUrlRanking} from '../controllers/ranking.controller.js'
import  express from 'express'


const router = express.Router()
router.get('/ranking', getUrlRanking)

export default router