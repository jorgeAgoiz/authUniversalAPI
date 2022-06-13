import { initializeApp } from '@firebase/app'
import { getStorage } from '@firebase/storage'
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}

/* const projectId: string = process.env.PROJECT_ID_GOOGLE!
const keyFilename: string | undefined = process.env.GOOGLE_APPLICATION_CREDENTIALS */
const bucketName: string = process.env.BUCKET_NAME_GOOGLE!
const dataBaseUrl: string = process.env.DATABASE_FIREBASE_URL!
const apiKeyFirebase: string = process.env.API_KEY_FIREBASE!
const authDomainFirebase: string = process.env.AUTH_DOMAIN_FIREBASE!

const firebaseConfig = {
	apiKey: apiKeyFirebase,
	authDomain: authDomainFirebase,
	databaseURL: dataBaseUrl,
	storageBucket: bucketName
}
const firebaseApp = initializeApp(firebaseConfig)

export const myStorage = getStorage(firebaseApp)