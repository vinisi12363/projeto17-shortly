import express from 'express'
import validateUrl from '../middlewares/validateUrl.middleware.js'
import { urlSchema } from '../schemas/url.schema.js';
import {create , findUrlById, getShortlyUrl, deleteUrlById} from '../controllers/url.controller.js'
import verifyJWT from '../middlewares/authJWT.middleware.js'


const router = express.Router()
router.get('/urls/open/:sUrl', getShortlyUrl)
router.get('/urls/:id',findUrlById)

router.use(verifyJWT);
router.post('/urls/shorten', validateUrl(urlSchema), create);
router.delete('/urls/:idf' , deleteUrlById);

export default router