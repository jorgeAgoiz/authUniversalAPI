import { RequestHandler } from 'express'
import { LogUser, NewUserDB, NewUser, LogUserDB } from '../types/auth'
import bcrypt from 'bcrypt'
import { db } from '../utils/firebaseDb'
import { FieldValue } from 'firebase-admin/firestore'
import { createToken } from '../utils/jwtAuth'

const usersCollection = db.collection('users')

// SignUp -> "/signup"
export const signUpUser: RequestHandler = async (req, res) => {
	const { email, password, confirmPassword }: NewUser = req.body
	try {
		if (password !== confirmPassword) {
			return res
				.status(412)
				.json({ message: 'Passwords must match' })
		}

		const userExists: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = 
			await usersCollection.where('email', '==', email).get()
		if (!userExists.empty) {
			return res
				.status(412)
				.json({ message: 'Email bussy' })
		}

		const hashedPassword: string = await bcrypt.hash(password, 12)
		const newUser: NewUserDB = {
			email,
			password: hashedPassword,
			created_at: FieldValue.serverTimestamp()
		}
		const user: FirebaseFirestore.WriteResult = 
			await usersCollection.doc().set(newUser)
		if (!(user.writeTime.seconds > 0)) {
			return res
				.status(400)
				.json({ message: 'Something went wrong' })
		}
		return res
			.status(201)
			.json({ result: 'User created' }) 

	} catch (error: any) {
		return res.status(400).json({ message: error.message })
	}
}

// SignIn -> "/signin"
export const signInUser: RequestHandler = async (req, res) => {
	const { email, password }: LogUser = req.body
	try {
		const user: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = 
			await usersCollection.where('email', '==', email).get()
		if (user.empty) {
			return res.status(412).json({ message: 'Email incorrect' })
		}
		const userData: LogUserDB = {
			id: user.docs[0].id,
			email: user.docs[0].data().email,
			created_at: user.docs[0].data().created_at
		}
		const passwordHashed: string = user.docs[0].data().password
		const correctPassword: boolean = await bcrypt.compare(password, passwordHashed)
		if (!correctPassword) {
			return res.status(401).json({ message: 'Incorrect password' })	
		}
		const token: string = createToken(userData.id, userData.email)
		
		return res.status(200).json({ message: 'Correct Login', token })
	} catch (error:any) {
		return res.status(400).json({ message: error.message })
	}
}

export const rememberPassword: RequestHandler = async (req, res) => {
	const { email, id, password }: any = req.body
	console.log({ email, id, password })
	return res.status(200).json({ message: 'Starting!!' })
}

/* 
Ruta para recordar contraseña:
- Recibe un email.
- Manda a ese email un enlace con el token en la URL.
- Si accedes desde esa URL, se lee el token.
- Verificado el token te da la opción de setear una nueva contraseña.
- Construcción de una ruta para cambiar el password.
*/