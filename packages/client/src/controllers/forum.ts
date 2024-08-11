import { ForumAPI, TCreateCommentRequest } from '@/api/forum-api'

const forumApi = new ForumAPI()

export class ForumController {
  public async getForumList() {
    return await forumApi.getForumList().then(data => data.data)
  }

  public async getTopicById(id: string) {
    return await forumApi.getTopicById(id).then(data => data.data)
  }

  public async createTopic(name: string) {
    return await forumApi.createTopic(name).then(data => data.data)
  }

  public async createComment(data: TCreateCommentRequest) {
    return await forumApi.createComment(data).then(data => data.data)
  }
}

export const forumController = new ForumController()
