import { User, MovieApi, MovieApiID } from './index'
import { Rating } from './rating';

export interface ResponseUsers {
  data: User[]
}

export interface ResponseUser {
  data: User
}

export interface ResponseOmdbSearch {
  Search: MovieApi[]
}

export interface ResponseRatings {
  data: Rating[]
}
