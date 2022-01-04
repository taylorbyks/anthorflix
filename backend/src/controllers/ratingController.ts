import { Router, Request, Response } from 'express'
import { RatingService } from '../services'

const RatingController = Router()
const ratingService = new RatingService()

RatingController.get('/', async (request: Request, response: Response) => {
  try {
    const ratings = await ratingService.getAll()

    return response.status(200).json(ratings)
  } catch (error) {
    if (error instanceof Error)
      return response.status(400).json({ error: error.message })
  }
})

RatingController.get('/my', async (request: Request, response: Response) => {
  try {
    const ratings = await ratingService.getAllFromUser(request.user.id)

    return response.status(200).json(ratings)
  } catch (error) {
    if (error instanceof Error)
      return response.status(400).json({ error: error.message })
  }
})

RatingController.post('/', async (request: Request, response: Response) => {
  try {
    const rating = await ratingService.create(request.body, request.user.id)

    return response.status(201).json(rating)
  } catch (error) {
    if (error instanceof Error)
      return response.status(400).json({ error: error.message })
  }
})

RatingController.put('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    const rating = await ratingService.update(request.body, id)

    return response.status(201).json(rating)
  } catch (error) {
    if (error instanceof Error)
      return response.status(400).json({ error: error.message })
  }
})

RatingController.delete(
  '/:id',
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params
      await ratingService.delete(id)

      return response.sendStatus(204)
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message })
    }
  },
)

export { RatingController }
