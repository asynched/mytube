import { User } from 'src/domain/entities'
import { httpClient } from 'src/shared/http'

export const getOwnerProfile = async () => {
  const { data } = await httpClient.get<User>('/profile')
  return data
}
