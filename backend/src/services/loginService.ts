import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const expiresIn = '1 day'

interface IUserLogin {
  email: string
  password: string
}

export class LoginService {
  async login({ password, email }: IUserLogin) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error('Email ou Senha não correspondem')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.TOKEN_SECRET as string,
      { expiresIn },
    )

    if (passwordMatch) {
      return token
    } else {
      throw new Error('Email ou Senha não correspondem')
    }
  }
}
