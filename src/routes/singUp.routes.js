import express from 'express'
import validateRegister from '../middlewares/validateRegister.middleware.js';
import { RegisterSchema } from '../schemas/register.schema.js';
import {create , findAllUsers} from '../controllers/User.RegisterController.js'

const router = express.Router()

router.post('/singup', validateRegister(RegisterSchema),  create);
router.get('/singup', findAllUsers)

export default router