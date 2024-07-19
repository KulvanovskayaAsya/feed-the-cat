import {
  OAuthAPI,
  ServiceIDGetRequest,
  ServiceIDGetResponse,
  OauthSignInRequest,
} from '@/api/o-auth-api'
const oAuth = new OAuthAPI()

export class OAuthController {
  public async getServiceID({
    redirect_uri,
  }: ServiceIDGetRequest): Promise<ServiceIDGetResponse> {
    try {
      const res = await oAuth.getServiceID({ redirect_uri })
      return res
    } catch (e) {
      throw new Error(e as string)
    }
  }

  public async postCode({
    code,
    redirect_uri,
  }: OauthSignInRequest): Promise<void> {
    try {
      const res = await oAuth.postCode({ code, redirect_uri })
      return res
    } catch (e) {
      throw new Error(e as string)
    }
  }
}

export const oAuthController = new OAuthController()
