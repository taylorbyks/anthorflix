import app from '../../src/app'
import request from 'supertest'
import { UserService } from 'src/services'

const userService = new UserService()

var id: string

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
