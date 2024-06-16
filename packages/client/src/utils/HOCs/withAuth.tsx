import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import { PATHS } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { get } from '@/store/slices/userSlice'
import { RootState, AppDispatch } from '@/store'

export function WithAuth({ Element }: { Element: FC }): JSX.Element {
  const navigate = useNavigate()

  const [isReadyRedirect, setIsReadyRedirect] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const isLoading = useSelector((state: RootState) => state.user.loading)

  const isLoginPage = [PATHS.LOGIN, PATHS.REGISTRATION].includes(
    location.pathname
  )

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
      navigate(PATHS.HOME)
    }

    if (isAuth && isLoginPage) {
      navigate(PATHS.PROFILE)
    }
  }

  useEffect(() => {
    if (!isAuth && !isLoading) {
      getUser()
      return
    }

    setIsReadyRedirect(true)
  }, [])

  useEffect(redirect, [isReadyRedirect])

  if (isLoading) {
    return <Spin spinning={isLoading} fullscreen size={'large'} />
  }

  return <Element />
}
