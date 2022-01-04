import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { IUserDTO } from '../models'

const prisma = new PrismaClient()

export class RegisterService {
  async create(user: IUserDTO): Promise<User> {
    const findUser = (await prisma.user.findUnique({
      where: { email: user.email },
    })) as User

    if (findUser) {
      throw new Error('Email já cadastrado')
    }

    const password = await bcrypt.hash(user.password, 8)

    const createdUser = (await prisma.user.create({
      data: {
        name: user.name,
        password,
        email: user.email,
      },
    })) as User

    return createdUser
  }
}
