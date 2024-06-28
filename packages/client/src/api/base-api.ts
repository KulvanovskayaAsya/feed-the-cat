import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { YANDEX_API } from './urls'

export type Indexed<T = unknown> = {
  [key in string]: T
}

export class BaseAPI {
  private instance: AxiosInstance
  private extract = <T>(v: T) => v

  constructor() {
    this.instance = axios.create({
      baseURL: YANDEX_API,
      withCredentials: true,
    })
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url).then(this.extract)
  }

  async post<T>(url: string, data: Indexed): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data).then(this.extract)
  }

  async put<T>(url: string, data: Indexed): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data).then(this.extract)
  }

  async delete<T>(url: string, data: Indexed): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, data).then(this.extract)
  }
}
