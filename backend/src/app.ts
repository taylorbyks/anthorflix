import express from 'express'
import { ensureAuthenticate } from './middlewares'
import {
  LoginController,
  UserController,
  ProfileController,
  RegisterController,
} from './controllers'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000'
}))

app.get('/', (_, response) => response.send({ version: process.env.VERSION }))
app.use('/login', LoginController)
app.use('/register', RegisterController)
app.use('/profile', ensureAuthenticate, ProfileController)
app.use('/users', ensureAuthenticate, UserController)

export default app
