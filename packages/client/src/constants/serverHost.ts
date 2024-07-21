import { isClient } from '@/utils'
import '../client.d'

export const SERVER_HOST = isClient()
  ? __INTERNAL_SERVER_URL__
  : __EXTERNAL_SERVER_URL__
