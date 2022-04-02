import jwt from 'jsonwebtoken'

const SECRET: string = process.env.SECRET_JET!

export const createToken = (id: string, email: string): string => {
	return jwt.sign({ id, email }, SECRET,{ expiresIn: 1800 })
}
export const createRefreshToken = (id: string, email: string): string => {
	return jwt.sign({ id, email }, SECRET,{ expiresIn: 2400 })
}