import app from '../../src/app'
import request from 'supertest'
import { token } from './login.spec'

describe('Update user', () => {
  it('Should be return updated user', async () => {
    const response = await request(app)
      .put(`/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste2',
        email: 'teste2@teste.com',
        password: '1234567',
      })

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('name')
    expect(response.body.name).toBe('Teste2')
    expect(response.body.email).toBe('teste2@teste.com')
    expect(response.body).toHaveProperty('email')
  })
})

describe('Update user', () => {
  it('Should be return updated user', async () => {
    const response = await request(app)
      .put(`/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'teste@teste.com',
        password: '123456',
      })

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('name')
    expect(response.body.email).toBe('teste@teste.com')
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
    expect(response.body.email).toBe('teste@teste.com')
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
