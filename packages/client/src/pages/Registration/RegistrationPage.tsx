import { FC, useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PixelForm } from '@/components/PixelForm'
import { SignUpRequest } from '@/api/auth-api'
import { Spin, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import isEqual from 'lodash/isEqual'
import { PATHS } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { create } from '@/store/slices/userSlice'
import { RootState, AppDispatch } from '@/store'

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
  const navigation = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const dispatch: AppDispatch = useDispatch()

  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const error = useSelector((state: RootState) => state.user.error)
  const isLoading = useSelector((state: RootState) => state.user.loading)

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

    await dispatch(create(body))
  }

  useEffect(() => {
    if (error) {
      api.error({
        message: error,
      })
    }
  }, [error])

  useEffect(() => {
    if (isAuth) {
      navigation(PATHS.PROFILE)
    }
  }, [isAuth])

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
