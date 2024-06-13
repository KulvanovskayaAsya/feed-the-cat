import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authController } from '../../controllers/auth'
import { useAuthContext } from '@/context'
import { Spin } from 'antd'
import { PATHS } from '@/constants'

export function WithAuth({ Element }: { Element: FC }): JSX.Element {
  const navigate = useNavigate()
  const { authData, setAuthData } = useAuthContext()
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const [isReadyRedirect, setIsReadyRedirect] = useState(false)

  const isLoginPage = [PATHS.LOGIN, PATHS.REGISTRATION].includes(
    location.pathname
  )

  const getUser = async () => {
    setIsLoadingUser(true)
    try {
      await authController.getUser()
      setAuthData({ isAuth: true })
      setIsLoadingUser(false)
      setIsReadyRedirect(true)
    } catch (e) {
      setAuthData({ isAuth: false })
      setIsLoadingUser(false)
      setIsReadyRedirect(true)
    }
  }

  const redirect = () => {
    if (!isReadyRedirect) {
      return
    }

    if (!authData.isAuth && !isLoginPage) {
      navigate(PATHS.HOME)
    }

    if (authData.isAuth && isLoginPage) {
      navigate(PATHS.PROFILE)
    }
  }

  useEffect(() => {
    if (!authData.isAuth && !isLoadingUser) {
      getUser()
      return
    }

    setIsReadyRedirect(true)
  }, [])

  useEffect(redirect, [isReadyRedirect])

  if (isLoadingUser) {
    return <Spin spinning={isLoadingUser} fullscreen size={'large'} />
  }

  return <Element />
}
