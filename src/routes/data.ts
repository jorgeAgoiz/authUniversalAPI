import express from 'express'
import { saveSpecie, getSpecies } from '../controllers/data'
import { multer } from '../middlewares/multer'

const dataRouter = express.Router()

dataRouter.post('/specie',multer, saveSpecie)
dataRouter.get('/specie', getSpecies)

export default dataRouter