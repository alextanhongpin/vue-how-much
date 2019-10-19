import cities from 'cities.json'
import City from '@/types/city'
import Position from '@/types/position'

export const getCities = () => cities.map((city: City) => city.name)

const distance = (a: Position, b: Position) => {
  return Math.sqrt(
    Math.abs(
      Math.pow(a.latitude - b.latitude, 2) -
        Math.pow(a.longitude - b.longitude, 2)
    )
  )
}

export const getClosestCity = ({ latitude, longitude }: Position) => {
  return cities.reduce(
    (prev: Position, next: City) => {
      const prevDistance = distance({ latitude, longitude }, prev)
      const nextPoint = {
        ...next,
        latitude: next.lat,
        longitude: next.lng
      }
      const nextDistance = distance({ latitude, longitude }, nextPoint)
      if (prevDistance < nextDistance) {
        return prev
      }
      return nextPoint
    },
    { latitude: Infinity, longitude: Infinity }
  )
}

export const searchCities = (keyword: string) => {
  const keywordLower = keyword.toLowerCase()
  const result = []
  for (let { name } of cities) {
    if (name === keyword) {
      return []
    }
    const match = name.toLowerCase().startsWith(keywordLower)
    if (match) {
      result.push(name)
    }
    if (result.length > 9) break
  }
  return result
}
