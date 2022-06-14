import { RequestHandler } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { db } from '../utils/firebaseDb'
import { JWT_SECRET } from '../utils/env.vars'


const usersCollection = db.collection('users')

export const verifyToken: RequestHandler = async ( req, res, next ) => {
	try {
		const authorization: string | undefined = req.headers['authorization']
  
		if (!authorization) {
			return res
				.status(404)
				.json({ message: 'Token not found' })
		}
		if (!authorization.toLowerCase().startsWith('bearer')) {
			return res
				.status(403)
				.json({ message: 'Invalid Token' })
		}
  
		const token: string = authorization.substring(7)
		const decoded: any = jwt.verify(token, JWT_SECRET)
        
		const userExists: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> = 
			await usersCollection.doc(decoded.id).get()
		if (!userExists.exists) {
			return res
				.status(404)
				.json({ message: 'User not found' })
		}
		req.body.id = userExists.id
		req.body.email = userExists.data()!.email
		next()
	} catch (error: any) {
		if(error instanceof TokenExpiredError){
			return res
				.status(401)
				.json({ message: error.message, expired: true })
		}
		return res
			.status(400)
			.json({ message: error.message })
	}
}

/* Si el token esta expirsado mandamos un status 401 con un json personalizado */