import express from 'express'
import validateLogin from '../middlewares/validateLogin.middleware.js';
import { LoginSchema } from '../schemas/login.schema.js';
import {login} from '../controllers/User.AuthController.js'

const router = express.Router()

router.post('/singin', validateLogin(LoginSchema),  login);

export default router