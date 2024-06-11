import { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authController } from '../../controllers/auth'
import { useAuthContext } from '@/context'
import { Spin } from 'antd'

export function WithAuth({ Element }: { Element: FC }): JSX.Element {
  const navigate = useNavigate()
  const { authData, setAuthData } = useAuthContext()
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  const isLoginPage = ['/login', '/registration'].includes(location.pathname)

  const getUser = async () => {
    setIsLoadingUser(true)
    try {
      await authController.getUser()
      setAuthData({ isAuth: true })
      setIsLoadingUser(false)

      if (isLoginPage) {
        navigate('/profile')
      }
    } catch (e) {
      setAuthData({ isAuth: false })
      setIsLoadingUser(false)

      if (!isLoginPage) {
        navigate('/login')
      }
    }
  }

  const redirect = () => {
    if (!authData.isAuth && !isLoginPage) {
      navigate('/login')
    }

    if (authData.isAuth && isLoginPage) {
      navigate('/profile')
    }
  }

  useEffect(() => {
    if (!authData.isAuth && !isLoadingUser) {
      getUser()
    }
  }, [authData.isAuth])

  useCallback(redirect, [location.pathname, authData.isAuth])

  if (isLoadingUser) {
    return <Spin spinning={isLoadingUser} fullscreen size={'large'} />
  } else {
    return <Element />
  }
}
