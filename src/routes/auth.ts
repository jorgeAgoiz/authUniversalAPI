import express, { Router } from 'express'
import { 
	signUpUser, 
	signInUser,
	rememberPassword,
} from '../controllers/auth'
import { verifyToken } from '../middlewares/authToken'

const authRouter: Router = express.Router()

authRouter.post('/signup', signUpUser)
authRouter.post('/signin', signInUser)
authRouter.post('/profile', rememberPassword)

export default authRouter