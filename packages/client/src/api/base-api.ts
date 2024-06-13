import axios, { AxiosInstance } from 'axios'
import { HTTPS } from './urls'

export type Indexed<T = unknown> = {
  [key in string]: T
}

export class BaseAPI {
  private instance: AxiosInstance
  private extract = <T>(v: T) => v

  constructor() {
    this.instance = axios.create({
      baseURL: HTTPS,
      withCredentials: true,
    })
  }

  async get(url: string): Promise<any> {
    return this.instance.get(url).then(this.extract)
  }

  async post(url: string, data: Indexed): Promise<any> {
    return this.instance.post(url, data).then(this.extract)
  }

  async put(url: string, data: Indexed): Promise<any> {
    return this.instance.put(url, data).then(this.extract)
  }

  async delete(url: string, data: Indexed): Promise<any> {
    return this.instance.delete(url, data).then(this.extract)
  }
}
