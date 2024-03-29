import {
  LoginService,
  RegisterService,
  UserService,
} from '../../../src/services'

var id: string
const loginService = new LoginService()
const registerService = new RegisterService()
const userService = new UserService()

beforeAll(async () => {
  try {
    const user = await registerService.create({
      name: 'Teste',
      email: 'testeUnitLogin@teste.com',
      password: '123456',
    })
    id = user.id
  } catch (error) {}
})

afterAll(async () => {
  try {
    await userService.delete(id)
  } catch (error) {}
})

describe('Make login', () => {
  it('Should be return created token', async () => {
    const token = await loginService.login({
      email: 'testeUnitLogin@teste.com',
      password: '123456',
    })

    expect(typeof token).toBe('string')
  })
})

describe('Create new login with registered email', () => {
  it('Should be return error', async () => {
    try {
      await loginService.login({
        email: 'testeUnitLogin@teste.com',
        password: '1234',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
