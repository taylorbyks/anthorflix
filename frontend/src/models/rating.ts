import { User } from "./user";

export interface Rating {
  id: string
  movie: string
  score: number
  review: string
  created_at: Date
  comments: Comment[]
  user: User
}

interface Comment {
  user: User
  message: string
  date: Date
}