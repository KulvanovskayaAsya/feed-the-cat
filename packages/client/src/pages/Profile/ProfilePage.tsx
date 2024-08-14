import React, { FC, useEffect } from 'react'
import { useSelector } from '@/store'
import { fetchUserThunk, selectUser } from '@/store/slices/userSlice'
import { PageInitArgs } from '@/router/routes'

import { Flex } from 'antd'
import { Typography } from 'antd'

import { usePage } from '@/utils/hooks'
import { User } from '@/api/auth-api'

const { Title } = Typography

export const ProfilePage: FC = () => {
  const { user } = useSelector(selectUser)
  const { first_name, second_name, display_name, email, phone } = user as User
  usePage({ initPage: initProfilePage })

  return (
    <Flex vertical>
      <Title>Name: {`${first_name} ${second_name}`}</Title>
      <Title level={2}>Username: {display_name}</Title>
      <Title level={3}>Email: {email}</Title>
      <Title level={3}>Phone: {phone}</Title>
    </Flex>
  )
}

export const initProfilePage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(fetchUserThunk())
  }
}
