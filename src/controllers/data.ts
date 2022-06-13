import { RequestHandler } from 'express'
import { format } from 'util'
import { Specie, UpdateSpecie } from '../types/data'
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

// DELETE -> "/specie/:id" delete a specific specie
export const deleteSpecie: RequestHandler = async (req, res) => {
	const specieId: string  = req.params.id
	try {
		if (!specieId) {
			return res.status(412).json({ message: 'Incorrect ID.' })
		}
		const mySpecie: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> = 
			await speciesCollection.doc(`${specieId}`).get()

		if (!mySpecie.exists) {
			return res.status(412).json({ message: 'Specie not found.' })
		}
		await speciesCollection.doc(specieId).delete()
		
		return res.status(200).json({ message: 'Deleted successfully.' })
	} catch (error: any) {
		return res
			.status(500)
			.json({ message: 'Something went wrong.', error: error.message })
	}
	
}

// PATCH -> "/specie" modify a specific specie
export const editSpecie: RequestHandler = async (req, res) => {
	const editSpecie: UpdateSpecie = req.body
	try {
		if (!editSpecie.id) {
			return res.status(412).json({ message: 'Must provide an ID.' }) 
		}
        

		if (req.file) {
			console.log('con archivo')
			const blob = bucket.file(`Especies/${req.file.originalname}`)
			const blobStream = blob.createWriteStream()
			blobStream.on('finish', async () => {
				const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
				editSpecie.picture = publicUrl

				const result = await speciesCollection.doc(editSpecie.id!).update(editSpecie)
				console.log(result)
				return res.status(200).json({ message: 'Working, picture updated.' })
			})
			blobStream.end(req.file.buffer)
		} else {
			console.log('sin archivo')
			console.log(editSpecie)
			return res.status(200).json({ message: 'Working, without picture.' })
		}

	
		/* 
     - Comprobar si viene foto
     - Si viene la subimos a Storage
     - Añadimos la url al objeto editSpecie
     - Eliminamos la foto anterior
     - Actualizamos en firestorage la ficha de especie
    */
	
		/* const result = speciesCollection.doc(editSpecie.id!).update({}) */
		
	} catch (error: any) {
		return res
			.status(500)
			.json({ message: 'Something went wrong.', error: error.message })
	}
	
}