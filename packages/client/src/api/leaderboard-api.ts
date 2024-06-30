import { BaseAPI } from './base-api'
import { TEAM_NAME } from './urls'
import type { User } from '@/api/auth-api'
import type { GameData } from '@/context'

export type LeaderboardData = User & GameData

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
  async addNewLeader(body: LeaderboardNewLeaderRequest): Promise<string> {
    return await this.post<string>('/leaderboard', body).then(data => data.data)
  }

  async getTeam(body: LeaderboardRequest): Promise<LeaderboardResponse[]> {
    return await this.post<LeaderboardResponse[]>(
      `/leaderboard/${TEAM_NAME}`,
      body
    ).then(data => data.data)
  }
}
