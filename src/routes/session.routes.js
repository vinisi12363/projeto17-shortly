import express from 'express'


const router = express.Router()

router.get('/users/me', validateLogin(LoginSchema),  login);

export default router