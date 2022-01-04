import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { IProfileUpdateDTO, IUser } from '../models'

const prisma = new PrismaClient()

export class ProfileService {
  async getOne(id: string) {
    const user = (await prisma.user.findUnique({
      where: { id },
    })) as IUser

    return user
  }

  async update(id: string, UserUpdate: IProfileUpdateDTO) {
    if (UserUpdate.password) {
      UserUpdate.password = await bcrypt.hash(UserUpdate.password, 8)
    }

    if (UserUpdate.email) {
      const findUser = (await prisma.user.findUnique({
        where: {
          email: UserUpdate.email,
        },
      })) as IUser

      if (findUser && findUser.id != id) {
        throw new Error('Email já cadastrado')
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: UserUpdate,
    })

    return user
  }
}
