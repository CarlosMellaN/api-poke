import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: {
    'Content-type': 'application/json',
  },
})

export const getAllPokemons = async () => {
  try {
    const response = await apiClient.get('pokemon?limit=151')
    // console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('Error fetching pokemons:', error)
    throw error
  }
}

export const getPokemon = async (id: string) => {
  try {
    const response = await apiClient.get(`pokemon/${id}`)
    // console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('Error fetching pokemon:', error)
    throw error
  }
}

export default apiClient
