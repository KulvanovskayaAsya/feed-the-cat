import { FC, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PixelForm } from '@/components/PixelForm'
import { authController } from '@/controllers/auth'
import { SignUpRequest } from '@/api/auth-api'
import { Spin, notification } from 'antd'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthContext, AuthData } from '../../context'
import isEqual from 'lodash/isEqual'
import { PATHS } from '@/constants'

const registrationFields = [
  {
    name: 'first_name',
    label: 'First Name',
  },
  {
    name: 'second_name',
    label: 'Second Name',
  },
  {
    name: 'login',
    label: 'Login',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'phone',
    label: 'Phone',
  },
]

export const RegistrationPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const { setAuthData } = useAuthContext()

  const [data, setData] = useState<SignUpRequest>({
    password: '',
    login: '',
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
  })

  const isChanged = useMemo(
    () =>
      function (body: SignUpRequest): boolean {
        return !isEqual(body, data)
      },
    [data.login, data.password]
  )

  const onFinish = async (body: SignUpRequest) => {
    if (!isChanged(body)) {
      return
    }

    setData(body)

    setIsLoading(true)
    const res = await authController.createUser(body as SignUpRequest)
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

    navigation(PATHS.PROFILE)
  }
  return (
    <div>
      {contextHolder}
      <PixelForm
        fields={registrationFields}
        buttonText="Register"
        onFinish={values => onFinish(values as SignUpRequest)}
      />

      <Link to={PATHS.LOGIN}>Already have an account?</Link>

      <Spin spinning={isLoading} fullscreen size={'large'} />
    </div>
  )
}
