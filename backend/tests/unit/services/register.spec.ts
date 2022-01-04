import { RegisterService, UserService } from '../../../src/services'

var id: string
const registerService = new RegisterService()
const userService = new UserService()

afterAll(async () => {
  try {
    await userService.delete(id)
  } catch (error) {
    console.log(error)
  }
})

describe('Create new user', () => {
  it('Should be return created user', async () => {
    const user = await registerService.create({
      name: 'Teste',
      email: 'testeUnitRegister@teste.com',
      password: '123456',
    })

    expect(user).toBeInstanceOf(Object)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user.name).toEqual('Teste')
    expect(user).toHaveProperty('email')
    expect(user.email).toEqual('testeUnitRegister@teste.com')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('created_at')

    id = user.id
  })
})

describe('Create new user with registered email', () => {
  it('Should be return error', async () => {
    try {
    await registerService.create({
      name: 'Teste',
      email: 'testeUnitRegister@teste.com',
      password: '123456',
    })
  } catch (error) {
    expect(error).toBeInstanceOf(Error)
  }
  })
})
