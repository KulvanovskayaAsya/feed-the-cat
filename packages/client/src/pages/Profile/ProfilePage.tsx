import React, { FC, useEffect } from 'react'
import { useSelector } from '@/store'
import { fetchUserThunk, selectUser } from '@/store/slices/userSlice'
import { PageInitArgs } from '@/router/routes'
import { usePage } from '@/utils/hooks'

async function testRequest() {
  const uuid = '3d0abf17-31fc-4f76-b530-3d1987047604'
  const url = `${process.env.EXTERNAL_SERVER_URL}/api/user`
  const body = {
    username: 'testuser',
    password: 'testpassword',
    email: 'testuser@example.com',
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `uuid=${uuid}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('User created:', data)
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

export const ProfilePage: FC = () => {
  const user = useSelector(selectUser)
  usePage({ initPage: initProfilePage })

  useEffect(() => {
    testRequest()
  }, [])

  return <h1>{JSON.stringify(user)}</h1>
}

export const initProfilePage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(fetchUserThunk())
  }
}
