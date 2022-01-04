import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { IUserDTO } from '../models'

const prisma = new PrismaClient()

export class UserService {
  async getAll(): Promise<User[]> {
    return await prisma.user.findMany()
  }

  async getOne(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return user
  }

  async delete(id: string) {
    const user = await prisma.user.findUnique({
      where: { id: id },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    await prisma.user.delete({
      where: { id },
    })

    return
  }
}
