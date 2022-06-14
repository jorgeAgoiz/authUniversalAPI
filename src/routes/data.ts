import express, { Router } from 'express'
import { saveSpecie, getSpecies, deleteSpecie, editSpecie } from '../controllers/data'
import { multer } from '../middlewares/multer'
import { verifyToken } from '../middlewares/authToken'

const dataRouter: Router = express.Router()

dataRouter.post('/specie',[multer, verifyToken], saveSpecie)
dataRouter.get('/specie', verifyToken, getSpecies)
dataRouter.delete('/specie/:id', verifyToken, deleteSpecie)
dataRouter.patch('/specie', [multer, verifyToken], editSpecie)

export default dataRouter