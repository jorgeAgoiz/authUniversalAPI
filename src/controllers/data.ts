import { RequestHandler } from 'express'
import { format } from 'util'
import { Specie } from '../types/data'
import { bucket } from '../utils/firebase.storage'
import { db } from '../utils/firebaseDb'

const speciesCollection = db.collection('Species')
// Implementar a todas las rutas el TOKEN JWT

// POST -> "/specie" save a specie
export const saveSpecie: RequestHandler = async (req, res) => {
	const newSpecie: Specie = req.body
	try {
		if(!req.file) {
			return res
				.status(412)
				.json({ message: 'Picture not found.' })
		}	

		const blob = bucket.file(`Especies/${req.file.originalname}`)
		const blobStream = blob.createWriteStream()
		blobStream.on('finish', async () => {
			const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
			newSpecie.picture = publicUrl

			const specie: FirebaseFirestore.WriteResult = 
                await speciesCollection.doc().set(newSpecie)

			if(!(specie.writeTime.seconds > 0)) {
				return res
					.status(400)
					.json({ message: 'Unsuccessful.' })
			}
			return res
				.status(200)
				.json({ message: 'Success' })
		})
		blobStream.end(req.file.buffer)

	} catch (error: any) {
		return res
			.status(500)
			.json({ message: 'Something went wrong.', error: error.message })
	}
}

// GET -> "/specie" get all species
export const getSpecies: RequestHandler = async ( req, res) => {
	try {
		const responseData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
            await speciesCollection.get()
		if(responseData.size <= 0) {
			return res
				.status(204)
				.json({ message: 'No documents found.' })
		}

		const allDocs: Array<Specie> = []
		responseData.forEach(elem => {
			const docData: FirebaseFirestore.DocumentData = elem.data()
			const specieObj: Specie = {
				name: docData.name,
				gender: docData.gender,
				phylum: docData.phylum,
				order: docData.order,
				family: docData.family,
				subfamily: docData.subfamily,
				location: docData.location,
				distribution: docData.distribution,
				feeding: docData.feeding,
				picture: docData.picture,
				id: elem.id
			}
			allDocs.push(specieObj)
		})
		return res.status(200).json({
			message: 'Success.',
			data: allDocs
		})  
	} catch (error: any) {
		return res
			.status(500)
			.json({ message: 'Something went wrong.', error: error.message })
	}

}
