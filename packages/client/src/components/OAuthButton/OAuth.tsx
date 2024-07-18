import { FC } from 'react'
import { PixelButton } from '@/components'
import { useSelector } from 'react-redux'
import { getServiceID } from '@/store/slices/serviceSlice'
import { serviceSelectors } from '@/store/selectors'
import { useAppDispatch } from '@/store'
import { SERVICE_URL_LOCAL } from '@/api/urls'

import cls from './OAuth.module.css'

interface OAuthProps {
  separatorText: string
}

export const OAuth: FC<OAuthProps> = ({ separatorText }) => {
  const service_id = useSelector(serviceSelectors.service_id)
  const dispatch = useAppDispatch()

  const oauth = async () => {
    await dispatch(getServiceID({ redirect_uri: SERVICE_URL_LOCAL }))

    if (service_id) {
      await window.location.replace(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${SERVICE_URL_LOCAL}`
      )
    }
  }

  return (
    <div className={cls.oauthWrapper}>
      <span className={cls.separator}>{separatorText}</span>

      <PixelButton onClick={oauth}>OAUTH</PixelButton>
    </div>
  )
}
