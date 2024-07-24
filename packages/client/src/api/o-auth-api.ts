import { BaseAPI } from './base-api'

export type ServiceIDGetRequest = {
  redirect_uri: string
}

export type ServiceIDGetResponse = {
  service_id: string
}

export type OauthSignInRequest = {
  code: string
  redirect_uri: string
}

export class OAuthAPI extends BaseAPI {
  async getServiceID({
    redirect_uri,
  }: ServiceIDGetRequest): Promise<ServiceIDGetResponse> {
    return await this.get<ServiceIDGetResponse>('/oauth/yandex/service-id', {
      redirect_uri,
    }).then(data => data.data)
  }

  async postCode({ code, redirect_uri }: OauthSignInRequest): Promise<void> {
    await this.post<OauthSignInRequest>('/oauth/yandex', {
      code,
      redirect_uri,
    })
  }
}
