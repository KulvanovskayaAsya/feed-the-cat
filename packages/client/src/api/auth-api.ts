import { BaseAPI } from './base-api'

export type SignInRequest = {
  login: string
  password: string
}

export type SignUpRequest = {
  login: string
  password: string
  first_name: string
  second_name: string
  email: string
  phone: string
}

export type SignUpResponse = {
  id: number
}

export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export class AuthAPI extends BaseAPI {
  async signup(body: SignUpRequest): Promise<SignUpResponse | void> {
    return this.post<SignUpResponse>('/auth/signup', body)
      .then(data => data.data)
      .catch(e => {
        throw e
      })
  }

  async signin(body: SignInRequest): Promise<string | void> {
    return this.post<string>('/auth/signin', body)
      .then(data => data.data)
      .catch(e => {
        throw e
      })
  }

  async logout(): Promise<string> {
    return await this.post<string>('/auth/logout', {}).then(data => data.data)
  }

  async getUser(): Promise<User> {
    return await this.get<User>('/auth/user').then(data => data.data)
  }
}
