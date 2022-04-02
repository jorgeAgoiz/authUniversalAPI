import { RequestHandler } from 'express'
import { User, NewUser } from '../types/auth'
import bcrypt from 'bcrypt'
import { db } from '../utils/firebaseDb'
import { FieldValue } from 'firebase-admin/firestore'

export const signUpUser: RequestHandler = async (req, res) => {
	const { email, password, confirmPassword }: User = req.body
	try {
		if (password !== confirmPassword) {
			return res
				.status(412)
				.json({ message: 'Passwords must match' })
		}

		const userExists: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = 
			await db.collection('users').where('email', '==', email).get()
		if (userExists.size > 0) {
			return res
				.status(412)
				.json({ message: 'Email bussy' })
		}

		const hashedPassword: string = await bcrypt.hash(password, 12)
		const newUser: NewUser = {
			email,
			password: hashedPassword,
			created_at: FieldValue.serverTimestamp()
		}
		const user: FirebaseFirestore.WriteResult = 
			await db.collection('users').doc().set(newUser)
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
}// SIGN UP Finished



export const signInUser: RequestHandler = async (req, res) => {
	return res.status(200).json({ message: 'Starting!!' })
}

export const editProfile: RequestHandler = async (req, res) => {
	
	return res.status(200).json({ message: 'Starting!!' })
}

export const rememberPassword: RequestHandler = async (req, res) => {
	return res.status(200).json({ message: 'Starting!!' })
}

export const deleteUser: RequestHandler = async (req, res) => {
	return res.status(200).json({ message: 'Starting!!' })
}

export const getUserBy: RequestHandler = async (req, res) => {
	return res.status(200).json({ message: 'Starting!!' })
}