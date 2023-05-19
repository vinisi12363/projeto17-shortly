import express from 'express'
import validateUrl from '../middlewares/validateUrl.middleware.js'
import { urlSchema } from '../schemas/url.schema.js';
import {create , findUrlById} from '../controllers/url.controller.js'

const router = express.Router()

router.post('/urls/shorten', validateUrl(urlSchema),  create);
router.get('/urls/:id', findUrlById)

export default router