import { RequestHandler } from 'express'
import { LogUser, NewUserDB, NewUser, LogUserDB } from '../types/auth'
import bcrypt from 'bcrypt'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { db } from '../utils/firebaseDb'
import { FieldValue } from 'firebase-admin/firestore'
import { createToken, createRefreshToken } from '../utils/jwtAuth'
import { transporter } from '../utils/nodemailer.config'
import { USER, JWT_SECRET } from '../utils/env.vars'

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
		return res
			.status(400)
			.json({ message: 'Something went wrong.', error: error.message })
	}
}

// SignIn -> "/signin"
export const signInUser: RequestHandler = async (req, res) => {
	const { email, password }: LogUser = req.body
	try {
		if (!email || !password) {
			return res
				.status(412)
				.json({ message: 'Incomplete data.' })
		}
		const user: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = 
			await usersCollection.where('email', '==', email).get()
		if (user.empty) {
			return res
				.status(412)
				.json({ message: 'Email incorrect' })
		}
		const userData: LogUserDB = {
			id: user.docs[0].id,
			email: user.docs[0].data().email,
			created_at: user.docs[0].data().created_at
		}
		const passwordHashed: string = user.docs[0].data().password
		const correctPassword: boolean = await bcrypt.compare(password, passwordHashed)
		if (!correctPassword) {
			return res
				.status(401)
				.json({ message: 'Incorrect password' })	
		}
		const token: string = createToken(userData.id, userData.email)
		const refreshToken: string = createRefreshToken(userData.id, userData.email)
		
		return res
			.status(200)
			.json({ message: 'Correct Login', token, refreshToken })
	} catch (error:any) {
		return res
			.status(400)
			.json({ message: 'Something went wrong.', error: error.message })
	}
}

// POST -> '/profile' send me email yo reset password
export const rememberPassword: RequestHandler = async (req, res) => {
	const email: string | undefined = req.body.email
	try {
		if (!email) {
			return res
				.status(412)
				.json({ message: 'Must provide an Email.' })
		}
		
		const users: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = 
			await usersCollection.where('email', '==', email).limit(1).get()
		if (users.empty) {
			return res
				.status(412)
				.json({ message: 'Email incorrect' })
		}
		const idUser: string = users.docs[0].id!
		const token: string = createToken(idUser, email)

		// Si figura se le manda un email con una URL y el token como param
		const mailSended = await transporter.sendMail({
			from: `"Jorge Luis Agoiz Website Dashboard" ${USER}`,
			to: email,
			subject: 'Resetea tu contraseña',
			html: `
		  		<h1>Resetear Contraseña</h1>
		  		<p>
		  		Haz click en el siguiente enlace para resetear tu contraseña: 
				${token}
		  		${'www.google.com'}
		  		</p>
		  		` /****** AJUSTAR ENLACE Incluyendo el ID en la petición para el front*/,
		})
		return res
			.status(200)
			.json({ message: 'Email sended.', response: mailSended.response })
	} catch (error: any) {
		return res
			.status(400)
			.json({ message: 'Something went wrong.', error: error.message })
	}
}

// POST -> '/refresh-token' send new tokens
export const refreshTokens: RequestHandler = async (req, res) => {
	
	try {
		const refrToken: string | undefined = req.body.refrToken
		if(!refrToken) {
			return res
				.status(412)
				.json({ message: 'Must provide refresh token.' })
		}
		const decoded: any = jwt.verify(refrToken, JWT_SECRET)
		console.log(decoded)
		const userExists: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> = 
			await usersCollection.doc(decoded.id).get()
		if (!userExists.exists) {
			return res
				.status(404)
				.json({ message: 'User not found' })
		}
		const token: string = createToken(decoded.id, decoded.email)
		const refreshToken: string = createRefreshToken(decoded.id, decoded.email)

		return res
			.status(200)
			.json({ message: 'Tokens Refreshed', token, refreshToken })
	} catch (error: any) {
		return res
			.status(400)
			.json({ message: 'Something went wrong.', error: error.message })
	}
}

/* 
Ruta para refrescar el token:
- Darle una vuelta al manejo de errores en este endpoint, hacer algo homogeneo.
*/



/* 
Ruta para recordar contraseña:
- Recibe un email.
- Manda a ese email un enlace con el token en la URL.
- Si accedes desde esa URL, se lee el token.
- Verificado el token te da la opción de setear una nueva contraseña.
- Construcción de una ruta para cambiar el password.
*/