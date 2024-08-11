import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import { PATHS } from '@/constants'
import { get } from '@/store/slices/userSlice'
import { useAppDispatch } from '@/store'
import { userSelectors } from '@/store/selectors'
import { useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { isClient } from '@/utils'

export function WithAuth({ Element }: { Element: FC }): JSX.Element {
  const navigate = useNavigate()

  const [isReadyRedirect, setIsReadyRedirect] = useState(false)
  const dispatch = useAppDispatch<ThunkDispatch<any, any, any>>()

  const isAuth = useSelector(userSelectors.isAuth)
  const isLoading = useSelector(userSelectors.isLoading)

  const isLoginPage = isClient()
    ? [PATHS.LOGIN, PATHS.REGISTRATION].includes(location.pathname)
    : false

  const getUser = async () => {
    try {
      await dispatch(get())
      setIsReadyRedirect(true)
    } catch (e) {
      setIsReadyRedirect(true)
    }
  }

  const redirect = () => {
    if (!isReadyRedirect) {
      return
    }

    if (!isAuth && !isLoginPage) {
      navigate(PATHS.LOGIN)
    }

    if (isAuth && isLoginPage) {
      navigate(PATHS.PROFILE)
    }
  }

  useEffect(() => {
    if (
      isClient() &&
      !isAuth &&
      !isLoading &&
      window.location.pathname !== PATHS.LOGIN
    ) {
      getUser()
      return
    }

    setIsReadyRedirect(true)
  }, [isClient() ? window.location.pathname : null])

  useEffect(redirect, [
    isReadyRedirect,
    isClient() ? window.location.pathname : null,
  ])

  if (isLoading) {
    return <Spin spinning={isLoading} fullscreen size={'large'} />
  }

  return <Element />
}
