import app from '../../src/app'
import request from 'supertest'
import { token } from './login.spec'

describe('Make request with admin token', () => {
  it('Should be return authorized', async () => {
    const response = await request(app)
      .get(`/users`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })
})

describe('Make request without auth token', () => {
  it('Should be return not authorized', async () => {
    const response = await request(app).get(`/profile`)

    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Unauthorized')
  })
})

describe('Make request with invalid auth token', () => {
  it('Should be return not authorized', async () => {
    const response = await request(app)
      .get(`/profile`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjYmMwYmViLTcyZDItNGRiMy1hODVhLTgxNTM0OTI5ODUxYSIsInVzZXJuYW1lIjoiVGVzdGUiLCJlbWFpbCI6InRlc3RlNEB0ZXN0ZS5jb20iLCJyb2xlcyI6W10sImlYzMzYzMjcyNCwiZXhwIjoxNjMzNzE5MTI0fQ.7cAjLmpQ7xStT8FdxdSXAFPgcIxdsU1t8GYs-E7tvTU',
      )

    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Unauthorized')
  })
})
