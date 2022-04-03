import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}
const SECRET: string = process.env.SECRET_JWT!

export const createToken = (id: string, email: string): string => {
	return jwt.sign({ id, email }, SECRET,{ expiresIn: 1800 })
}
/* export const createRefreshToken = (id: string, email: string): string => {
	return jwt.sign({ id, email }, SECRET,{ expiresIn: 2400 })
} */

/* 
	En principio la idea es que con cada peticion se cree un nuevo token 
	y se refresque el frontend con el nuevo token de 20min de duración.
*/