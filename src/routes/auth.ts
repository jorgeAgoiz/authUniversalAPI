import express from 'express'
import { signUpUser, signInUser, editProfile, deleteUser, rememberPassword } from '../controllers/auth'

const authRouter = express.Router()

authRouter.post('/signup', signUpUser)
authRouter.post('/signin', signInUser)

authRouter.post('/profile', rememberPassword)
authRouter.patch('/profile', editProfile)
authRouter.delete('/profile', deleteUser)


export default authRouter