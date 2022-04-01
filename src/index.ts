import express from 'express'
import authRouter from './routes/auth'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authRouter)

app.listen(3012, () => {
	console.log('Listen on port 3012...')
})

/* Posible BBDD https://firebase.google.com/docs/firestore/quickstart */