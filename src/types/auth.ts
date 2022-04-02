import { FieldValue } from 'firebase-admin/firestore'

//SignUp Interfaces
export interface User {
	email: string
	password: string
	confirmPassword: string
}
export interface NewUser {
	email: string
	password: string
	created_at?: FieldValue
}