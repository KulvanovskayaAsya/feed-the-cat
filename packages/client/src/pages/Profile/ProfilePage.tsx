import { FC } from 'react'
import { withAuth } from '@/utils/HOCs/withAuth'

export const ProfilePage: FC = () => {
  return <h1>Profile Page</h1>
}

export const ProfilePageWithAuth = withAuth(ProfilePage)
