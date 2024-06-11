import { FC, useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PixelForm } from '@/components/PixelForm'
import { authController } from '@/controllers/auth'
import { SignInRequest } from '@/api/auth-api'
import { Spin, notification } from 'antd'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthContext, AuthData } from '../../context'
import { isEqual } from 'lodash'

const loginFields = [
  {
    name: 'login',
    label: 'Login',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
]

export const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const { setAuthData } = useAuthContext()

  const [data, setData] = useState({
    password: '',
    login: '',
  } as SignInRequest)

  const isChanged = useMemo(
    () =>
      function (body: SignInRequest): boolean {
        return !isEqual(body, data)
      },
    [data.login, data.password]
  )

  const onFinish = async (body: SignInRequest) => {
    if (!isChanged(body)) {
      return
    }

    setData(body)

    setIsLoading(true)
    const res = await authController.signinUser(body as SignInRequest)
    setIsLoading(false)
    if (res instanceof AxiosError && res.response?.data.reason) {
      api.error({
        message: res.response?.data.reason,
      })

      if (res.response?.data.reason === 'User already in system') {
        setAuthData((prevAuthData: AuthData) => {
          return { ...prevAuthData, isAuth: true }
        })
      } else {
        setAuthData((prevAuthData: AuthData) => {
          return { ...prevAuthData, isAuth: false }
        })
      }

      return
    }

    setAuthData((prevAuthData: AuthData) => {
      return { ...prevAuthData, isAuth: true }
    })

    navigation('/profile')
  }

  return (
    <div>
      {contextHolder}
      <PixelForm
        fields={loginFields}
        buttonText="Log in"
        onFinish={values => onFinish(values as SignInRequest)}
      />

      <Link to="/registration">No account yet?</Link>

      <Spin spinning={isLoading} fullscreen size={'large'} />
    </div>
  )
}
