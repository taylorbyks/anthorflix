import { UserService, RegisterService } from '../../../src/services'

var id: string
const userService = new UserService()
const registerService = new RegisterService()

beforeAll(async () => {
  try {
    const user = await registerService.create({
      name: 'Teste',
      email: 'testeUnitUser@teste.com',
      password: '123456',
    })
    id = user.id
  } catch (error) {

  }
})

describe('Get all users', () => {
  it('Should be return array of users', async () => {
    const users = await userService.getAll()

    expect(users).toBeInstanceOf(Array)
    expect(users[0]).toHaveProperty('id')
    expect(users[0]).toHaveProperty('name')
    expect(users[0]).toHaveProperty('email')
    expect(users[0]).toHaveProperty('created_at')
  })
})

describe('Get one user', () => {
  it('Should be return user', async () => {
    const user = await userService.getOne(id)

    expect(user).toBeInstanceOf(Object)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user.name).toEqual('Teste')
    expect(user).toHaveProperty('email')
    expect(user.email).toEqual('testeUnitUser@teste.com')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('created_at')
  })
})

describe('Delete one user', () => {
  it('Should be return no content', async () => {
    await userService.delete(id)
  })
})

describe('Delete user with wrong id', () => {
  it('Should be return error', async () => {
    try {
      await userService.delete(id)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})

describe('Get one user with wrong id', () => {
  it('Should be return error', async () => {
    try {
      await userService.getOne(id)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
