import express, { Express } from 'express'
import authRouter from './routes/auth'
import morgan from 'morgan'
import dotenv from 'dotenv'
import dataRouter from './routes/data'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { apiLimiter } from './utils/rate.limiter'

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}

const app: Express = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(cors())
app.use(helmet())
app.use(apiLimiter)
// Rutas
app.use(authRouter)
app.use(dataRouter)

app.listen(3012, () => {
	console.log('Listen on port 3012...')
})