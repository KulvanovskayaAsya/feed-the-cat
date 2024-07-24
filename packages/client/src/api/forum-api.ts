import { TComment, TTopic } from '@/store/slices/forumSlice'
import { BaseAPI } from './base-api'
import { COMMENT_URL, TEAM_NAME, TOPIC_URL } from './urls'

export type TCreateCommentRequest = {
  topicId: string
  content: string
}

export class ForumAPI extends BaseAPI {
  getForumList() {
    return this.get<TTopic[]>(TOPIC_URL)
  }

  createTopic(name: string) {
    return this.post<TTopic>(TOPIC_URL, { name })
  }

  getTopicById(id: string) {
    return this.get<TTopic>(TOPIC_URL + `/${id}`)
  }

  createComment(data: TCreateCommentRequest) {
    return this.post<TComment>(COMMENT_URL, data)
  }
}
