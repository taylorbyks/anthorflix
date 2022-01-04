import axios from 'axios'
import { MovieApiID, ResponseOmdbSearch } from '../models'

const omdbApi = {
  async search(name: string) {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${name}&type=movie`,
    )
    return data as ResponseOmdbSearch
  },

  async getById(id: string) {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${id}`,
    )
    return data as MovieApiID
  },
}

export default omdbApi
