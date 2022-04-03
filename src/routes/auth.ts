import express from 'express'
import { signUpUser, signInUser, editProfile, deleteUser, rememberPassword, getUserBy } from '../controllers/auth'
import { verifyToken } from '../middlewares/auth'

const authRouter = express.Router()

authRouter.post('/signup', signUpUser)
authRouter.post('/signin', signInUser)

authRouter.post('/profile', verifyToken, rememberPassword)
authRouter.patch('/profile', verifyToken, editProfile)
authRouter.delete('/profile', verifyToken, deleteUser)

authRouter.get('/profile', verifyToken, getUserBy)


export default authRouter