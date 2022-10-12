import { AuthToken } from 'src/domain/entities'
import { httpClient } from 'src/shared/http'

export const signIn = async (email: string, password: string) => {
  const { data } = await httpClient.post<AuthToken>('/auth/login', {
    email,
    password,
  })

  return data
}
