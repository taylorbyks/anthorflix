import app from '../../src/app'
import request from 'supertest'
import { RegisterService, UserService, LoginService } from '../../src/services'

var id: string
var secondId: string
var token: string
const loginService = new LoginService()
const registerService = new RegisterService()
const userService = new UserService()

beforeAll(async () => {
  try {
    const user = await registerService.create({
      name: 'Teste',
      email: 'testeIntProfile@teste.com',
      password: '123456',
    })
    id = user.id

    const secondUser = await registerService.create({
      name: 'Teste',
      email: 'teste1@teste.com',
      password: '123456',
    })
    secondId = secondUser.id

    token = await loginService.login({
      email: 'testeIntProfile@teste.com',
      password: '123456',
    })
  } catch (error) {
    console.log(error)
  }
})

afterAll(async () => {
  try {
    await userService.delete(id)
    await userService.delete(secondId)
  } catch (error) {
    console.log(error)
  }
})

describe('Update user', () => {
  it('Should be return updated user', async () => {
    const response = await request(app)
      .put(`/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste2',
        password: '1234567',
      })

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('name')
    expect(response.body.name).toBe('Teste2')
    expect(response.body).toHaveProperty('email')
  })
})

describe('Update user', () => {
  it('Should be return updated user', async () => {
    const response = await request(app)
      .put(`/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste',
      })

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('name')
    expect(response.body.name).toBe('Teste')
    expect(response.body).toHaveProperty('email')
  })
})

describe('Get one user', () => {
  it('Should be return user', async () => {
    const response = await request(app)
      .get(`/profile`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
  })
})

describe('Update user with registered email', () => {
  it('Should be return error', async () => {
    const response = await request(app)
      .put(`/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste',
        email: 'teste1@teste.com',
        password: '123456',
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Email já cadastrado')
  })
})
