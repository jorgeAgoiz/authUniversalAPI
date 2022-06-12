import express from 'express'
import { saveSpecie } from '../controllers/data'
import { multer } from '../middlewares/multer'

const dataRouter = express.Router()

dataRouter.post('/specie',multer, saveSpecie)

export default dataRouter