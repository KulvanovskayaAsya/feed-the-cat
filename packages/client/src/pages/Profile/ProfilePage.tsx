import { FC } from 'react'

import { useSelector } from '@/store'
import { selectUser } from '@/store/slices/userSlice'

export const ProfilePage: FC = () => {
  const user = useSelector(selectUser)

  return <h1>{JSON.stringify(user)}</h1>
}
