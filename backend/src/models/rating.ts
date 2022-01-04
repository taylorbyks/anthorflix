export class IRatingDTO {
  movie: string
  score: number
  review: string
}

export class IRatingUpdateDTO {
  score?: number
  review?: string
}
