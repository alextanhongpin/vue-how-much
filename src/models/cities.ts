import cities from 'cities.json'
import Position from '@/types/position'

const distance = (a: Position, b: Position) => {
  return Math.sqrt(
    Math.abs(
      Math.pow(a.latitude - b.latitude, 2) -
        Math.pow(a.longitude - b.longitude, 2)
    )
  )
}

export const getClosestCity = ({ latitude, longitude }) => {
  return cities.reduce(
    (prev, next) => {
      const prevDistance = distance({ latitude, longitude }, prev)
      const nextPoint = {
        ...next,
        latitude: parseFloat(next.lat, 10),
        longitude: parseFloat(next.lng, 10)
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

export const searchCities = keyword => {
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
