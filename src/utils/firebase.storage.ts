import dotenv from 'dotenv'
import { Bucket, Storage } from '@google-cloud/storage'
if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}
/* Variables de entorno */
const projectId: string = process.env.PROJECT_ID_GOOGLE!
const keyFilename: string | undefined = process.env.GOOGLE_APPLICATION_CREDENTIALS
const bucketName: string = process.env.BUCKET_NAME_GOOGLE!

const storage: Storage = new Storage({
	projectId,
	keyFilename
})
export const bucket: Bucket = storage.bucket(bucketName)