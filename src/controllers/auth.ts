import { RequestHandler } from 'express'
import { User } from '../types/auth'
import bcrypt from 'bcrypt'
import { db } from '../utils/firebaseDb'

const saltRounds = 12

export const signUpUser: RequestHandler = async (req, res) => {
	const { email, password, confirmPassword }: User = req.body
	
	try {
		if(password !== confirmPassword) {
			return res.status(404).json({ message: 'Passwords must match' })
		}
		const hashedPassword: string = await bcrypt.hash(password, saltRounds)
		const users = await db.collection('users').get()
		return res.status(200).json({ result: users.docs[0].data() }) 
	} catch (error: any) {
		console.log(error)
	}
}



export const signInUser: RequestHandler = async (req, res) => {
	return res.status(200).json({ message: 'Starting!!' })
}

export const editProfile: RequestHandler = async (req, res) => {
	
	return res.status(200).json({ message: 'Starting!!' })
}

export const rememberPassword: RequestHandler = async (req, res) => {
	return res.status(200).json({ message: 'Starting!!' })
}

export const deleteUser: RequestHandler = async (req, res, next) => {
	return res.status(200).json({ message: 'Starting!!' })
}