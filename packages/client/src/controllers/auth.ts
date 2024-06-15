import { AuthAPI, SignUpRequest, SignInRequest } from '@/api/auth-api'

const auth = new AuthAPI()

export class AuthController {
  public async createUser(data: SignUpRequest) {
    if (!data) {
      throw new Error('Нет данных')
    }

    try {
      const res = await auth.signup(data)
      return res
    } catch (e) {
      return e
    }
  }

  public async signinUser(data: SignInRequest) {
    if (!data) {
      throw new Error('Нет данных')
    }

    try {
      const res = await auth.signin(data)
      return res
    } catch (e) {
      return e
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
