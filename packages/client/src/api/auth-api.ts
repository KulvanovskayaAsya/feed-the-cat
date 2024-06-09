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
  async signup(body: SignUpRequest): Promise<SignUpResponse> {
    const res = await this.post('/auth/signup', body)
    return res
  }

  async signin(body: SignInRequest) {
    const { data } = await this.post('/auth/signin', body)
    return data
  }

  async logout() {
    const res = await this.post('/auth/logout', {})
    return res
  }

  async getUser() {
    const { data } = await this.get('/auth/user')
    return data
  }
}
