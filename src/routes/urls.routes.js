import express from 'express'
import validateUrl from '../middlewares/validateUrl.middleware.js'
import { urlSchema } from '../schemas/url.schema.js';
import {create , findUrlById, getShortlyUrl, deleteUrlById} from '../controllers/url.controller.js'

const router = express.Router()

router.post('/urls/shorten', validateUrl(urlSchema),  create);
router.get('/urls/:id', findUrlById)
router.get('/urls/open/:sUrl', getShortlyUrl)
router.delete('/urls/:id', deleteUrlById)

export default router