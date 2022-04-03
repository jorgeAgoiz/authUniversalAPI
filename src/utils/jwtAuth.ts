import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}
const SECRET: string = process.env.SECRET_JWT!

export const createToken = (id: string, email: string): string => {
	return jwt.sign({ id, email }, SECRET,{ expiresIn: 1800 })
}
export const createRefreshToken = (id: string, email: string): string => {
	return jwt.sign({ id, email }, SECRET,{ expiresIn: 2400 })
}