import nodemailer from 'nodemailer'
import { USER, PASS } from './env.vars'

export const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: USER,
		pass: PASS,
	},
})