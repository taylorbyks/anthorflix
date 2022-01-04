import { User } from "./user";

export interface Rating {
  movie: string
  score: number
  review: string
  user: User
}
