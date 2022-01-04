import { Router, Request, Response } from 'express'
import { RegisterService } from '../services'

const RegisterController = Router()
const registerService = new RegisterService()

RegisterController.post('/', async (request: Request, response: Response) => {
  try {
    const user = await registerService.create(request.body)

    return response.status(201).json(user)
  } catch (error) {
    if (error instanceof Error)
      return response.status(400).json({ error: error.message })
  }
})

export { RegisterController }
