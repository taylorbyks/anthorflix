import app from '../../src/app'
import request from 'supertest'
import { LoginService, RegisterService, UserService } from '../../src/services'

var id: string
var token: string
const loginService = new LoginService()
const userService = new UserService()
const registerService = new RegisterService()

beforeAll(async () => {
  try {
    const user = await registerService.create({
      name: 'Teste',
      email: 'testeIntUser@teste.com',
      password: '123456',
    })
    id = user.id

    token = await loginService.login({
      email: 'testeIntUser@teste.com',
      password: '123456',
    })
  } catch (error) {}
})

afterAll(async () => {
  try {
    await userService.delete(id)
  } catch (error) {}
})

describe('Get all users', () => {
  it('Should be return array of users', async () => {
    const response = await request(app)
      .get(`/users`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('name')
    expect(response.body[0]).toHaveProperty('email')
  })
})

describe('Get one user', () => {
  it('Should be return user', async () => {
    const response = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
  })
})

describe('Delete one user', () => {
  it('Should be return no content', async () => {
    const response = await request(app)
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(204)
  })
})

describe('Delete user with wrong id', () => {
  it('Should be return error', async () => {
    const response = await request(app)
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Usuário não encontrado')
  })
})

describe('Get one user with wrong id', () => {
  it('Should be return error', async () => {
    const response = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Usuário não encontrado')
  })
})
