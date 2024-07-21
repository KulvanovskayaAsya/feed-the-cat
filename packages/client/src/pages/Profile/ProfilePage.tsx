import { FC } from 'react'

import { useSelector } from '@/store'
import { fetchUserThunk, selectUser } from '@/store/slices/userSlice'
import { PageInitArgs } from '@/router/routes'
import { usePage } from '@/utils/hooks'

export const ProfilePage: FC = () => {
  const user = useSelector(selectUser)
  usePage({ initPage: initProfilePage })

  return <h1>{JSON.stringify(user)}</h1>
}

export const initProfilePage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(fetchUserThunk())
  }
}
