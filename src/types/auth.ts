import { FieldValue } from 'firebase-admin/firestore'

//SignUp Interfaces
export interface NewUser {
	email: string
	password: string
	confirmPassword: string
}
export interface NewUserDB {
	email: string
	password: string
	created_at?: FieldValue
}

// SignIn Interfaces
export interface LogUser {
	email: string
	password: string
}
export interface LogUserDB {
	id: string
	email: string
	password?: string
	created_at: FieldValue
}