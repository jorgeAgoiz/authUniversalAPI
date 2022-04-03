import express from 'express'
import { signUpUser, signInUser, editProfile, deleteUser, rememberPassword } from '../controllers/auth'
import { verifyToken } from '../middlewares/auth'

const authRouter = express.Router()

authRouter.post('/signup', signUpUser)
authRouter.post('/signin', signInUser)

authRouter.post('/profile', rememberPassword)
authRouter.patch('/profile', editProfile)
authRouter.delete('/profile', verifyToken, deleteUser)


export default authRouter