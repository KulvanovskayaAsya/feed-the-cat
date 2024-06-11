import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PixelForm } from '@/components/PixelForm'

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
  return (
    <div>
      <PixelForm fields={loginFields} buttonText="Log in" />

      <Link to="/registration">No account yet?</Link>
    </div>
  )
}
