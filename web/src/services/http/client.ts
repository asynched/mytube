import axios, { AxiosInstance } from 'axios'

export class HttpClient {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    })
  }

  async get<T>(...params: Parameters<AxiosInstance['get']>) {
    return this.client.get<T>(...params)
  }

  async post<T>(...params: Parameters<AxiosInstance['post']>) {
    return this.client.post<T>(...params)
  }

  async put<T>(...params: Parameters<AxiosInstance['put']>) {
    return this.client.put<T>(...params)
  }

  async delete<T>(...params: Parameters<AxiosInstance['delete']>) {
    return this.client.delete<T>(...params)
  }

  async patch<T>(...params: Parameters<AxiosInstance['patch']>) {
    return this.client.patch<T>(...params)
  }

  setAuthToken(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  clearAuthToken() {
    delete this.client.defaults.headers.common.Authorization
  }
}
