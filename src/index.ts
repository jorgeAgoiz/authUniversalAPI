import express from 'express'
import authRouter from './routes/auth'
import morgan from 'morgan'
import dotenv from 'dotenv'
import dataRouter from './routes/data'
import cors from 'cors'
import helmet from 'helmet'
import { apiLimiter } from './utils/rate.limiter'

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(apiLimiter)
// Rutas
app.use(authRouter)
app.use(dataRouter)

app.listen(3012, () => {
	console.log('Listen on port 3012...')
})

/* Posible BBDD https://firebase.google.com/docs/firestore/quickstart */