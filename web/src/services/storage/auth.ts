export const JWT_STORAGE_KEY = '@storage:jwt'

export const setLocalStorageAuthToken = (token: string) => {
  localStorage.setItem(JWT_STORAGE_KEY, token)
}

export const getLocalStorageAuthToken = () => {
  return localStorage.getItem(JWT_STORAGE_KEY)
}

export const removeLocalStorageAuthToken = () => {
  localStorage.removeItem(JWT_STORAGE_KEY)
}
