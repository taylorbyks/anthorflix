import app from '../../src/app'
import request from 'supertest'
import { RegisterService, UserService } from '../../src/services'

const registerService = new RegisterService()
const userService = new UserService()

var id: string
var token: string

beforeAll(async () => {
  try {
    const user = await registerService.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
    })
    id = user.id
  } catch (error) {
    console.log(error)
  }
})

afterAll(async () => {
  try {
    await userService.delete(id)
  } catch (error) {
    console.log(error)
  }
})

describe('Login', () => {
  it('Should be return a valid token', async () => {
    const response = await request(app).post(`/login`).send({
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(typeof response.body.token).toBe('string')

    token = response.body.token
  })
})

describe('Login with wrong email/passoword', () => {
  it('Should be return a valid token', async () => {
    const response = await request(app).post(`/login`).send({
      email: 'teste@te',
      password: '12345',
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Email ou Senha não correspondem')
  })
})

export { token }
