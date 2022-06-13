import express, { Router } from 'express'
import { 
	signUpUser, 
	signInUser,
	rememberPassword,
} from '../controllers/auth'
import { verifyToken } from '../middlewares/auth'

const authRouter: Router = express.Router()

authRouter.post('/signup', signUpUser)
authRouter.post('/signin', signInUser)
authRouter.post('/profile', verifyToken, rememberPassword)

export default authRouter