// @ts-nocheck
import axios, { AxiosInstance } from 'axios'

export type Indexed<T = unknown> = {
  [key in string]: T
}

export class BaseAPI {
  private instance: AxiosInstance
  private extract = <T>(v: T) => v

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
    })
  }

  async get<T>(url: string): Promise<T> {
    return this.instance.get<T>(url).then(this.extract)
  }

  async post<T>(url: string, data: Indexed): Promise<T> {
    return this.instance.post<T>(url, data).then(this.extract)
  }

  async put<T>(url: string, data: Indexed): Promise<T> {
    return this.instance.put<T>(url, data).then(this.extract)
  }

  async delete<T>(url: string, data: Indexed): Promise<T> {
    return this.instance.delete<T>(url, { data }).then(this.extract)
  }
}

export const localAPI = new BaseAPI('http://localhost:3001/api')

export type Topic = {
  id: number
  title: string
  content: string
  userId: number
}

export type Comment = {
  id: number
  content: string
  topicId: number
  userId: number
}

export type Reply = {
  id: number
  content: string
  commentId: number
  userId: number
}

export class ForumAPI extends BaseAPI {
  async createTopic(topic: Partial<Topic>): Promise<Topic> {
    return this.post<Topic>('/topics', topic).then(data => data.data)
  }

  async getTopics(): Promise<Topic[]> {
    return this.get<Topic[]>('/topics').then(data => data.data)
  }

  async createComment(comment: Partial<Comment>): Promise<Comment> {
    return this.post<Comment>('/comments', comment).then(data => data.data)
  }

  async getComments(topicId: number): Promise<Comment[]> {
    return this.get<Comment[]>(`/comments/${topicId}`).then(data => data.data)
  }

  async createReply(reply: Partial<Reply>): Promise<Reply> {
    return this.post<Reply>('/replies', reply).then(data => data.data)
  }

  async getReplies(commentId: number): Promise<Reply[]> {
    return this.get<Reply[]>(`/replies/${commentId}`).then(data => data.data)
  }
}

export const forumAPI = new ForumAPI()
