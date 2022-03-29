import express from "express"
import { signUpUser } from '../controllers/auth';

const authRouter = express.Router()

authRouter.post("/", signUpUser)

export default authRouter