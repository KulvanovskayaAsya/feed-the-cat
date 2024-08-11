import { AuthAPI, SignUpRequest, SignInRequest } from '@/api/auth-api'
import { AxiosError } from 'axios'

const auth = new AuthAPI()

export class AuthController {
  public async createUser(data: SignUpRequest) {
    if (!data) {
      throw new Error('No data')
    }

    try {
      const res = await auth.signup(data)
      return res
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.reason) {
        if (error.response?.data.reason === 'User already in system') {
          throw 'User already in system'
        } else {
          throw error.response.data.reason
        }
      }
      throw error
    }
  }

  public async signinUser(data: SignInRequest) {
    if (!data) {
      throw new Error('No data')
    }

    try {
      const res = await auth.signin(data)
      return res
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.reason) {
        if (error.response?.data.reason === 'User already in system') {
          throw 'User already in system'
        } else {
          throw error.response.data.reason
        }
      }
      throw error
    }
  }

  public async getUser() {
    try {
      const res = await auth.getUser()
      return res
    } catch (e) {
      throw new Error(e as string)
    }
  }
}

export const authController = new AuthController()
