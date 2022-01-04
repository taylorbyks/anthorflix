import { Router, Request, Response } from 'express'
import { LoginService } from '../services'

const LoginController = Router()
const loginService = new LoginService()

LoginController.post('/', async (request: Request, response: Response) => {
  try {
    const token = await loginService.login(request.body)

    return response.json({ token })
  } catch (error) {
    if (error instanceof Error)
      return response.status(400).json({ error: error.message })
  }
})

export { LoginController }
