import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../types/auth'

export const signUpUser: RequestHandler = async (req, res) => {
	const { email, password, confirmPassword }: User = req.body
	
	try {
		if(password !== confirmPassword) {
			return res.status(404).json({ message: 'Passwords must match' })
		}
		return res.status(200).json({ message: 'Starting!!', email, password }) 
	} catch (error: any) {
		console.log(error)
	}
	return res.status(200).json({ message: 'Starting!!' })
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