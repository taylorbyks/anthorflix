import { IRatingDTO, IRatingUpdateDTO } from '../models'
import { PrismaClient, Rating } from '@prisma/client'

const prisma = new PrismaClient()

export class RatingService {
  async getAll(): Promise<Rating[]> {
    return await prisma.rating.findMany({
      include: {
        user: true,
      },
    })
  }

  async getAllFromUser(id: string): Promise<Rating[]> {
    const ratings = await prisma.rating.findMany({
      where: { user_fk: id },
      include: {
        user: true,
      },
    })

    if (!ratings) {
      throw new Error('O usuário não possui avaliações')
    }

    return ratings
  }

  async create(rating: IRatingDTO, id: string): Promise<Rating> {
    const createdRating = (await prisma.rating.create({
      data: {
        movie: rating.movie,
        score: rating.score,
        user_fk: id,
        review: rating.review,
      },
    })) as Rating

    return createdRating
  }

  async update(rating: IRatingUpdateDTO, id: string): Promise<Rating> {
    const ratingToUpdate = await prisma.rating.findUnique({
      where: { id },
    })

    if (!ratingToUpdate) {
      throw new Error('Avaliação não encontrado')
    }

    const updatetedRating = await prisma.rating.update({
      where: { id },
      data: {
        score: rating.score,
        review: rating.review,
      },
    })

    return updatetedRating
  }

  async delete(id: string, userId: string) {
    const rating = await prisma.rating.findUnique({
      where: { id },
    })

    if (!rating || rating.user_fk !== userId) {
      throw new Error('Avaliação não encontrado')
    }

    await prisma.rating.delete({
      where: { id },
    })

    return
  }
}
