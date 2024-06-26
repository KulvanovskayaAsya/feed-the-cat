import { BaseAPI } from './base-api'
import { AxiosResponse } from 'axios'
import { TEAM_NAME } from './urls'

export type LeaderboardData = {
  login: string
  email: string
  scores: number
  life: number
  time: string
}

export type LeaderboardNewLeaderRequest = {
  data: LeaderboardData
  ratingFieldName: string
  teamName: string
}

export type LeaderboardRequest = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type LeaderboardResponse = {
  data: LeaderboardData
}

export class LeaderboardAPI extends BaseAPI {
  async addNewLeader(
    body: LeaderboardNewLeaderRequest
  ): Promise<AxiosResponse<string>> {
    return await this.post('/leaderboard', body)
  }

  async getTeam(
    body: LeaderboardRequest
  ): Promise<AxiosResponse<LeaderboardResponse[]>> {
    const { data } = await this.post(`/leaderboard/${TEAM_NAME}`, body)
    return data
  }
}
