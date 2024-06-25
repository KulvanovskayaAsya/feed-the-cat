import { BaseAPI } from './base-api'
import { AxiosResponse } from 'axios'

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
  async signup(body: SignUpRequest): Promise<AxiosResponse<SignUpResponse>> {
    return this.post('/auth/signup', body)
      .then(({ data }) => data)
      .catch(e => {
        throw e
      })
  }

  async signin(body: SignInRequest): Promise<AxiosResponse<string>> {
    return this.post('/auth/signin', body)
      .then(({ data }) => data)
      .catch(e => {
        throw e
      })
  }

  async logout(): Promise<AxiosResponse<string>> {
    const response = await this.post('/auth/logout', {})
    return response
  }

  async getUser(): Promise<AxiosResponse<User>> {
    const { data } = await this.get('/auth/user')
    return data
  }
}
