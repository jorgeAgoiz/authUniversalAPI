import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './env.vars'

export const createToken = (id: string, email: string): string => {
	return jwt.sign({ id, email }, JWT_SECRET,{ expiresIn: 1800 })
}
/* export const createRefreshToken = (id: string, email: string): string => {
	return jwt.sign({ id, email }, SECRET,{ expiresIn: 2400 })
} */

/* 
	En principio la idea es que con cada peticion se cree un nuevo token 
	y se refresque el frontend con el nuevo token de 20min de duración.
*/