import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { PixelForm } from '@/components/PixelForm'
import { authController } from '@/controllers/auth'
import { SignUpRequest } from '@/api/auth-api'
import { Spin, notification } from 'antd'
import { AxiosError } from 'axios'
import { withAuth } from '@/utils/HOCs/withAuth'
import { useNavigate } from 'react-router-dom'

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

  const onFinish = async (data: unknown) => {
    setIsLoading(true)
    const res = await authController.createUser(data as SignUpRequest)
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
      <PixelForm
        fields={registrationFields}
        buttonText="Register"
        onFinish={onFinish}
      />

      <Link to="/login">Already have an account?</Link>

      <Spin spinning={isLoading} fullscreen size={'large'} />
    </div>
  )
}

export const RegistrationPageWithAuth = withAuth(RegistrationPage)
