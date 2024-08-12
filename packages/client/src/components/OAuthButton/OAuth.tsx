import { FC } from 'react'
import { PixelButton } from '@/components'
import { useSelector } from 'react-redux'
import { getServiceID } from '@/store/slices/serviceSlice'
import { serviceSelectors } from '@/store/selectors'
import { useAppDispatch } from '@/store'
import { SERVICE_URL } from '@/api/urls'
import { ThunkDispatch } from 'redux-thunk'
import { YANDEX_OAUTH_API } from '@/api/urls'
import yandexLogo from '@/assets/yandex/yandexLogo.png'

import cls from './OAuth.module.css'

interface OAuthProps {
  separatorText: string
}

export const OAuth: FC<OAuthProps> = ({ separatorText }) => {
  const service_id = useSelector(serviceSelectors.service_id)
  const dispatch = useAppDispatch<ThunkDispatch<any, any, any>>()

  const oauth = async () => {
    await dispatch(getServiceID({ redirect_uri: SERVICE_URL }))

    if (service_id) {
      window.location.replace(
        `${YANDEX_OAUTH_API}?response_type=code&client_id=${service_id}&redirect_uri=${SERVICE_URL}`
      )
    }
  }

  return (
    <div className={cls.oauthWrapper}>
      <span className={cls.separator}>{separatorText}</span>

      <PixelButton onClick={oauth}>
        <img className={cls.yandexLogo} src={yandexLogo} alt="yandex" />
      </PixelButton>
    </div>
  )
}
