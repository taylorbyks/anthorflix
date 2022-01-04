import {
  ProfileService,
  RegisterService,
  UserService,
} from '../../../src/services'

var id: string
const profileService = new ProfileService()
const registerService = new RegisterService()
const userService = new UserService()

beforeAll(async () => {
  try {
    const user = await registerService.create({
      name: 'Teste',
      email: 'testeUnitProfile@teste.com',
      password: '123456',
    })
    id = user.id
  } catch (error) {
    console.log(error)
  }
})

afterAll(async () => {
  try {
    await userService.delete(id)
  } catch (error) {
    console.log(error)
  }
})

describe('Update user', () => {
  it('Should be return error', async () => {
    const profile = await profileService.update(id, {
      name: 'Updated',
      email: 'updated@teste.com',
    })
    expect(profile).toBeInstanceOf(Object)
    expect(profile).toHaveProperty('id')
    expect(profile).toHaveProperty('name')
    expect(profile.name).toEqual('Updated')
    expect(profile).toHaveProperty('email')
    expect(profile.email).toEqual('updated@teste.com')
  })
})
