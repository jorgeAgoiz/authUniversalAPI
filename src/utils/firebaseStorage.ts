import { initializeApp } from '@firebase/app'
import { getStorage } from '@firebase/storage'
import { 
	BUCKET_NAME, 
	DATABASE_URL, 
	APIKEY_FIREBASE, 
	AUTH_DOMAIN_FIREBASE 
} from './env.vars'

const firebaseConfig = {
	apiKey: APIKEY_FIREBASE,
	authDomain: AUTH_DOMAIN_FIREBASE,
	databaseURL: DATABASE_URL,
	storageBucket: BUCKET_NAME
}
const firebaseApp = initializeApp(firebaseConfig)

export const myStorage = getStorage(firebaseApp)