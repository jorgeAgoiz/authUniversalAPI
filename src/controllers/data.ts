import { RequestHandler } from 'express'
import { format } from 'util'
import { Specie } from '../types/data'
import { bucket } from '../utils/firebase.storage'


export const saveSpecie: RequestHandler = async (req, res) => {
	const newSpecie: Specie = req.body
	console.log(newSpecie) 
	try {
		if(req.file) {
			const blob = bucket.file(`Especies/${req.file.originalname}`)
			const blobStream = blob.createWriteStream()
  
			blobStream.on('finish', () => {
				const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
				res.status(200).json({ message: 'Success', publicUrl })
				console.log('Success')
			})
			blobStream.end(req.file.buffer)
		} else {
			throw new Error('File doesnt exists')
		}
	} catch (error) {
		res.status(500).json({ message: 'something went wrong' })
	}
}

// Perfecto, con multer podremos decodificar los form data de POSTMAN