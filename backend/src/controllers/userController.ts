import { Router, Request, Response } from 'express'
import { UserService } from '../services'

const UserController = Router()
const userService = new UserService()

UserController.get(
  '/',
  async (request: Request, response: Response) => {
    try {
      const users = await userService.getAll()

      return response.status(200).json(users)
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message })
    }
  },
)

UserController.get(
  '/:id',
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params
      const user = await userService.getOne(id)

      return response.status(200).json(user)
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message })
    }
  },
)

UserController.delete(
  '/:id',
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params
      await userService.delete(id)

      return response.sendStatus(204)
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message })
    }
  },
)

export { UserController }
