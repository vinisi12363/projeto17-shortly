import express from 'express'
import validateLogin from '../middlewares/validateRegister.middleware.js';
import { LoginSchema } from '../schemas/register.schema.js';
import {login} from '../controllers/User.AuthController.js'

const router = express.Router()

router.post('/singup', validateLogin(LoginSchema),  login);

export default router