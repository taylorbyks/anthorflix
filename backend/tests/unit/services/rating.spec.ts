import {
  RatingService,
  RegisterService,
  UserService,
} from '../../../src/services'

var id: string
var ratingId: string
const ratingService = new RatingService()
const registerService = new RegisterService()
const userService = new UserService()

beforeAll(async () => {
  try {
    const user = await registerService.create({
      name: 'Teste',
      email: 'testeUnitRating@teste.com',
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

describe('Create new rating', () => {
  it('Should be return created rating', async () => {
    const rating = await ratingService.create(
      {
        movie: '1',
        score: 10,
        review: 'Começou muito bem',
      },
      id,
    )

    expect(rating).toBeInstanceOf(Object)
    expect(rating).toHaveProperty('id')
    expect(rating).toHaveProperty('movie')
    expect(rating).toHaveProperty('user_fk')
    expect(rating).toHaveProperty('score')
    expect(rating).toHaveProperty('review')

    ratingId = rating.id
  })
})

describe('Update rating', () => {
  it('Should be return updated rating', async () => {
    const rating = await ratingService.update(
      {
        score: 10,
        review: 'Começou muito bem',
      },
      ratingId,
    )

    expect(rating).toBeInstanceOf(Object)
    expect(rating).toHaveProperty('id')
    expect(rating).toHaveProperty('movie')
    expect(rating).toHaveProperty('user_fk')
    expect(rating).toHaveProperty('score')
    expect(rating).toHaveProperty('review')

    ratingId = rating.id
  })
})

describe('Get all ratings', () => {
  it('Should be return array of ratings', async () => {
    const ratings = await ratingService.getAll()

    expect(ratings).toBeInstanceOf(Array)
    expect(ratings[0]).toHaveProperty('id')
    expect(ratings[0]).toHaveProperty('movie')
    expect(ratings[0]).toHaveProperty('user_fk')
    expect(ratings[0]).toHaveProperty('score')
    expect(ratings[0]).toHaveProperty('review')
  })
})

describe('Get ratings from user', () => {
  it('Should be return rating', async () => {
    const ratings = await ratingService.getAllFromUser(id)

    expect(ratings).toBeInstanceOf(Array)
    expect(ratings[0]).toHaveProperty('id')
    expect(ratings[0]).toHaveProperty('movie')
    expect(ratings[0]).toHaveProperty('user_fk')
    expect(ratings[0]).toHaveProperty('score')
    expect(ratings[0]).toHaveProperty('review')
  })
})

describe('Delete one rating', () => {
  it('Should be return no content', async () => {
    await ratingService.delete(ratingId, id)
  })
})

describe('Delete rating with wrong id', () => {
  it('Should be return error', async () => {
    try {
      await ratingService.delete(ratingId, id)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})

describe('Get one rating with wrong id', () => {
  it('Should be return error', async () => {
    try {
      await ratingService.getAllFromUser(ratingId)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
