import app from '../../src/app'
import request from 'supertest'
import { LoginService, RegisterService, UserService } from '../../src/services'

var id: string
var token: string
const loginService = new LoginService()
const registerService = new RegisterService()
const userService = new UserService()

beforeAll(async () => {
  try {
    const user = await registerService.create({
      name: 'Teste',
      email: 'testeIntRegister@teste.com',
      password: '123456',
    })
    id = user.id

    token = await loginService.login({
      email: 'testeIntRegister@teste.com',
      password: '123456',
    })
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

describe('Create new user', () => {
  it('Should be return created user', async () => {
    const response = await request(app).post(`/register`).send({
      name: 'Teste',
      email: 'teste3@teste.com',
      password: '123456',
    })

    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')

    id = response.body.id
  })
})

describe('Create new user with registered email', () => {
  it('Should be return error', async () => {
    const response = await request(app).post(`/register`).send({
      name: 'Teste',
      email: 'teste3@teste.com',
      password: '123456',
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Email já cadastrado')
  })
})
