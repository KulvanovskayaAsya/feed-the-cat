import { FC, useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PixelForm } from '@/components/PixelForm'
import { SignInRequest } from '@/api/auth-api'
import { Spin, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import isEqual from 'lodash/isEqual'
import { PATHS } from '@/constants'
import { signin } from '@/store/slices/userSlice'
import { useAppDispatch } from '@/store'
import { userSelectors } from '@/store/selectors'
import { useSelector } from 'react-redux'

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
  const navigation = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const dispatch = useAppDispatch()

  const isAuth = useSelector(userSelectors.isAuth)
  const error = useSelector(userSelectors.error)
  const isLoading = useSelector(userSelectors.isLoading)

  const [data, setData] = useState<SignInRequest>({
    password: '',
    login: '',
  })

  const isChanged = useMemo(
    () =>
      (body: SignInRequest): boolean =>
        !isEqual(body, data),
    [data.login, data.password]
  )

  const onFinish = async (body: SignInRequest) => {
    if (!isChanged(body)) {
      return
    }

    setData(body)

    await dispatch(signin(body))
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
        fields={loginFields}
        buttonText="Log in"
        onFinish={values => onFinish(values as SignInRequest)}
      />

      <Link to={PATHS.REGISTRATION}>No account yet?</Link>

      <Spin spinning={isLoading} fullscreen size={'large'} />
    </div>
  )
}
