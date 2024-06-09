import React, { FC, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authController } from '../../controllers/auth'

export const withAuth = function (WrappedComponent: React.ComponentType): FC {
  const WithAuthComponent: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    let isAuth = false
    const isLoginPage = ['/login', '/registration'].includes(location.pathname)

    useEffect(() => {
      async function fetchUser() {
        try {
          await authController.getUser()
          isAuth = true
        } catch (e) {
          isAuth = false
        }

        if (!isAuth && !isLoginPage) {
          navigate('/login')
        }

        if (isAuth && isLoginPage) {
          navigate('/profile')
        }
      }

      fetchUser()
    }, [])

    return <WrappedComponent />
  }

  return WithAuthComponent
}
