import { RequestHandler } from 'express'
import { Specie, UpdateSpecie } from '../types/data'
import { db } from '../utils/firebaseDb'
import { ref, uploadBytes, deleteObject } from '@firebase/storage'
import { myStorage } from '../utils/firebaseStorage'

const speciesCollection = db.collection('Species')
// Implementar a todas las rutas el TOKEN JWT

// POST -> "/specie" save a specie
export const saveSpecie: RequestHandler = async (req, res) => {
	const newSpecie: Specie = req.body
	const pic: Express.Multer.File | undefined = req.file
	const metadata = {
		contentType: 'image/jpeg',
	}
	try {
		if(!pic) {
			return res
				.status(412)
				.json({ message: 'Picture not found.' })
		}
		const storageRef = ref(myStorage, `Especies/${pic.originalname}`)
		const snapshot = await uploadBytes(storageRef, pic.buffer, metadata)
		newSpecie.picture = `https://storage.googleapis.com/${snapshot.metadata.bucket}/${snapshot.metadata.name}`

		const specie: FirebaseFirestore.WriteResult = 
            await speciesCollection.doc().set(newSpecie)
        
		if(specie.writeTime.seconds <= 0) {
			return res
				.status(400)
				.json({ message: 'Unsuccessful.' })
		}
		return res
			.status(200)
			.json({ message: 'Success' })

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
			return res
				.status(412)
				.json({ message: 'Incorrect ID.' })
		}
		const mySpecie: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> = 
			await speciesCollection.doc(`${specieId}`).get()
		const specieCopy: FirebaseFirestore.DocumentData | undefined = mySpecie.data()
		if (!mySpecie.exists || !specieCopy) {
			return res
				.status(412)
				.json({ message: 'Specie not found.' })
		}
		await speciesCollection.doc(specieId).delete()
		const namePicture: Array<string> = specieCopy.picture.split('/')
		
		const storageRef = ref(myStorage, `Especies/${namePicture[namePicture.length - 1]}`)
		await deleteObject(storageRef)
	
		return res
			.status(200)
			.json({ message: 'Deleted successfully.' })
	} catch (error: any) {
		return res
			.status(500)
			.json({ message: 'Something went wrong.', error: error.message })
	}
	
}

// PATCH -> "/specie" modify a specific specie
export const editSpecie: RequestHandler = async (req, res) => {
	const editSpecie: UpdateSpecie = req.body
	const pic: Express.Multer.File | undefined = req.file
	const metadata = {
		contentType: 'image/jpeg',
	}
	let defaultPicName = ''
	try {
		if (!editSpecie.id) {
			return res
				.status(412)
				.json({ message: 'Must provide an ID.' }) 
		}
		const mySpecie: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> = 
			await speciesCollection.doc(`${editSpecie.id}`).get()
		if(!mySpecie.exists) {
			return res
				.status(412)
				.json({ message: 'Specie not found.' })
		}
		const specieCopy: FirebaseFirestore.DocumentData | undefined = mySpecie.data()
		const namePicture: Array<string> = specieCopy!.picture.split('/')
		if (pic) {
			const storageRef = ref(myStorage, `Especies/${pic.originalname}`)
			const snapshot = await uploadBytes(storageRef, pic.buffer, metadata)
			editSpecie.picture = `https://storage.googleapis.com/${snapshot.metadata.bucket}/${snapshot.metadata.name}`
			defaultPicName = snapshot.metadata.name
		}
		await speciesCollection.doc(editSpecie.id!).update(editSpecie)
		if (namePicture[namePicture.length -1] !== defaultPicName) {
			const storageRef = ref(myStorage, `Especies/${namePicture[namePicture.length - 1]}`)
			await deleteObject(storageRef)
		}
		return res
			.status(200)
			.json({ message: 'Updated successfully.' })
	} catch (error: any) {
		return res
			.status(500)
			.json({ message: 'Something went wrong.', error: error.message })
	}
}

/* export const testingSpecies: RequestHandler = (req, res) => {

	return res.status(200).json({ message: 'working!!' })
} */