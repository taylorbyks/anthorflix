import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { UserService } from '../services'

const userService = new UserService()

export interface IUserAuth {
  id: string
  name: string
  email: string
}

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const [, token] = authToken.split(' ')

  try {
    const user = verify(token, process.env.TOKEN_SECRET as string) as IUserAuth

    request.user = user

    return next()
  } catch (error) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
}
