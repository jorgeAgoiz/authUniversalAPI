import express, { Router } from 'express'
import { saveSpecie, getSpecies, deleteSpecie, editSpecie } from '../controllers/data'
import { multer } from '../middlewares/multer'

const dataRouter: Router = express.Router()

dataRouter.post('/specie',multer, saveSpecie)
dataRouter.get('/specie', getSpecies)
dataRouter.delete('/specie/:id', deleteSpecie)
dataRouter.patch('/specie', multer, editSpecie)

export default dataRouter