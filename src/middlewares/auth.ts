import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { db } from '../utils/firebaseDb'

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}
const SECRET: string = process.env.SECRET_JWT!
const usersCollection = db.collection('users')

export const verifyToken: RequestHandler = async ( req, res, next ) => {
	try {
		const authorization: string | undefined = req.headers['authorization']
  
		if (!authorization) {
			return res
				.status(403)
				.json({ message: 'Token not found', status_code: 403 })
		}
		if (!authorization.toLowerCase().startsWith('bearer')) {
			return res
				.status(401)
				.json({ message: 'Invalid Token', status_code: 401 })
		}
  
		const token: string = authorization.substring(7)
		const decoded: any = jwt.verify(token, SECRET)
        
		const userExists: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> = 
			await usersCollection.doc(decoded.id).get()
		if (!userExists.exists) {
			return res
				.status(404)
				.json({ message: 'User not found', status_code: 404 })
		}
		req.body.userId = userExists.id
		next()
	} catch (error: any) {
		return res.status(400).json({ message: error.message, status_code: 400 })
	}
}

/* Siguiente paso implementacion del refresh token JWT */