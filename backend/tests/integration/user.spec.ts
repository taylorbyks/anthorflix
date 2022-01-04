import app from '../../src/app'
import request from 'supertest'
import { token } from './login.spec'
import { RegisterService } from 'src/services'

const registerService = new RegisterService()
var id: string

beforeAll(async () => {
  try {
  const user = await registerService.create({
    name: 'Teste',
    email: 'user@teste.com',
    password: '123456',
  })
  id = user.id
} catch (error) {
  console.log(error)
}
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

describe('Create new user with registered email', () => {
  it('Should be return error', async () => {
    const response = await request(app)
      .post(`/users`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste',
        email: 'teste3@teste.com',
        password: '123456',
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Email já cadastrado')
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

describe('Update user with wrong id', () => {
  it('Should be return error', async () => {
    const response = await request(app)
      .put(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Usuário não encontrado')
  })
})
