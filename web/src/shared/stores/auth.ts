import createBox from 'blackbox.js'
import { User } from 'src/domain/entities'
import { getOwnerProfile } from 'src/services/http/profile'
import {
  setLocalStorageAuthToken,
  removeLocalStorageAuthToken,
} from 'src/services/storage/auth'
import { httpClient } from 'src/shared/http'

type AuthState = {
  token: Maybe<string>
  user: Maybe<User>
}

export const authBox = createBox<AuthState>({
  token: null,
  user: null,
})

export const setApplicationAuthToken = (token: Maybe<string>) => {
  authBox.set((state) => {
    state.token = token
    return state
  })
}

export const setApplicationUser = (user: Maybe<User>) => {
  authBox.set((state) => {
    state.user = user
    return state
  })
}

export const updateApplicationAuthState = async (token: string) => {
  setLocalStorageAuthToken(token)
  setApplicationAuthToken(token)
  httpClient.setAuthToken(token)

  const user = await getOwnerProfile()

  setApplicationUser(user)
}

export const clearAuthState = () => {
  removeLocalStorageAuthToken()
  setApplicationAuthToken(null)
  setApplicationUser(null)
}
