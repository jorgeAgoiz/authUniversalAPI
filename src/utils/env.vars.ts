import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}
// De momento sin usar
export const projectId: string = process.env.PROJECT_ID_GOOGLE!
export const keyFilename: string | undefined = process.env.GOOGLE_APPLICATION_CREDENTIALS
// De momento sin usar
export const USER: string = process.env.MAIL_NAME!
export const PASS: string = process.env.APP_GOOGLE_PASS!
export const BUCKET_NAME: string = process.env.BUCKET_NAME_GOOGLE!
export const DATABASE_URL: string = process.env.DATABASE_FIREBASE_URL!
export const APIKEY_FIREBASE: string = process.env.API_KEY_FIREBASE!
export const AUTH_DOMAIN_FIREBASE: string = process.env.AUTH_DOMAIN_FIREBASE!
export const JWT_SECRET: string = process.env.SECRET_JWT!
export const PORT: string = process.env.PORT!
