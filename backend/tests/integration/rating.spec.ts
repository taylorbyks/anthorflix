import app from '../../src/app'
import request from 'supertest'
import { LoginService, RegisterService, UserService } from '../../src/services'

var id: string
var token: string
var ratingId: string
const loginService = new LoginService()
const userService = new UserService()
const registerService = new RegisterService()

beforeAll(async () => {
  try {
    const user = await registerService.create({
      name: 'Teste',
      email: 'testeIntRating@teste.com',
      password: '123456',
    })
    id = user.id

    token = await loginService.login({
      email: 'testeIntRating@teste.com',
      password: '123456',
    })
  } catch (error) {}
})

afterAll(async () => {
  try {
    await userService.delete(id)
  } catch (error) {}
})

describe('Create new rating', () => {
  it('Should be return created rating', async () => {
    const response = await request(app)
      .post(`/ratings`)
      .send({
        movie: '1',
        score: 10,
        review: 'Teste',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.body).not.toHaveProperty('error')
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('movie')
    expect(response.body).toHaveProperty('user_fk')
    expect(response.body).toHaveProperty('score')
    expect(response.body).toHaveProperty('review')

    ratingId = response.body.id
  })
})

describe('Get all ratings', () => {
  it('Should be return array of ratings', async () => {
    const response = await request(app)
      .get(`/ratings`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('movie')
    expect(response.body[0]).toHaveProperty('user_fk')
    expect(response.body[0]).toHaveProperty('score')
    expect(response.body[0]).toHaveProperty('review')
  })
})

describe('Get all ratings created by me', () => {
  it('Should be return array of ratings', async () => {
    const response = await request(app)
      .get(`/ratings/my`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('movie')
    expect(response.body[0]).toHaveProperty('user_fk')
    expect(response.body[0]).toHaveProperty('score')
    expect(response.body[0]).toHaveProperty('review')
  })
})

describe('Delete one rating', () => {
  it('Should be return no content', async () => {
    const response = await request(app)
      .delete(`/ratings/${ratingId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(204)
  })
})

describe('Delete user with wrong id', () => {
  it('Should be return error', async () => {
    const response = await request(app)
      .delete(`/ratings/${id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })
})
