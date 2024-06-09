import axios from 'axios'
import { HTTPS } from './urls'

export type Indexed<T = unknown> = {
  [key in string]: T
}

export class BaseAPI {
  a = axios.create()
  extract = (v: unknown) => v

  async get(url: string): Promise<any> {
    return this.a
      .get(`${HTTPS}${url}`, { withCredentials: true })
      .then(this.extract)
  }

  async post(url: string, data: Indexed): Promise<any> {
    return this.a
      .post(`${HTTPS}${url}`, data, { withCredentials: true })
      .then(this.extract)
  }

  async put(url: string, data: Indexed): Promise<any> {
    return this.a
      .put(`${HTTPS}${url}`, data, { withCredentials: true })
      .then(this.extract)
  }

  async delete(url: string, data: Indexed): Promise<any> {
    return this.a.delete(`${HTTPS}${url}`, data).then(this.extract)
  }
}
