import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PixelForm } from '@/components/PixelForm'

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
  return (
    <div>
      <PixelForm fields={registrationFields} buttonText="Register" />

      <Link to="/login">Already have an account?</Link>
    </div>
  )
}
