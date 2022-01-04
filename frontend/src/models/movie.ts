import { ReactNode } from 'react'

export interface Movie {
  title: string
  year: string
  poster: string
  imdbID: string
  description: string
  footer: ReactNode
}

export interface MovieApi {
  Title: string
  Year: string
  Poster: string
  imdbID: string
}

export interface MovieApiID {
  Title: string
  Year: string
  Poster: string
  imdbID: string
  Plot: string
}
