import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { PixelForm } from '@/components/PixelForm'
import { authController } from '@/controllers/auth'
import { SignInRequest } from '@/api/auth-api'
import { Spin, notification } from 'antd'
import { AxiosError } from 'axios'
import { withAuth } from '@/utils/HOCs/withAuth'
import { useNavigate } from 'react-router-dom'

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

  const onFinish = async (data: unknown) => {
    setIsLoading(true)
    const res = await authController.signinUser(data as SignInRequest)
    setIsLoading(false)
    if (res instanceof AxiosError && res.response?.data.reason) {
      api.error({
        message: res.response?.data.reason,
      })
      return
    }

    navigation('/profile')
  }

  return (
    <div>
      {contextHolder}
      <PixelForm fields={loginFields} buttonText="Log in" onFinish={onFinish} />

      <Link to="/registration">No account yet?</Link>

      <Spin spinning={isLoading} fullscreen size={'large'} />
    </div>
  )
}

export const LoginPageWithAuth = withAuth(LoginPage)
