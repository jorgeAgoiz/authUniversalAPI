import express, { Router } from 'express'
import { 
	signUpUser, 
	signInUser,
	rememberPassword,
} from '../controllers/auth'
import { verifyToken } from '../middlewares/authToken'
import { refreshTokens } from '../controllers/auth'

const authRouter: Router = express.Router()

authRouter.post('/signup', signUpUser)
authRouter.post('/signin', signInUser)
authRouter.post('/profile', rememberPassword)
authRouter.post('/refresh-token', refreshTokens)

export default authRouter