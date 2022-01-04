import { Router, Request, Response } from 'express'
import { ProfileService } from '../services'

const ProfileController = Router()
const profileService = new ProfileService()

ProfileController.get('/', async (request: Request, response: Response) => {
  try {
    const { id } = request.user
    const user = await profileService.getOne(id)

    return response.status(200).json(user)
  } catch (error) {
    if (error instanceof Error)
      return response.status(400).json({ error: error.message })
  }
})

ProfileController.put('/', async (request: Request, response: Response) => {
  try {
    const { id } = request.user
    const user = await profileService.update(id, request.body)

    return response.status(200).json(user)
  } catch (error) {
    if (error instanceof Error)
      return response.status(400).json({ error: error.message })
  }
})

export { ProfileController }
