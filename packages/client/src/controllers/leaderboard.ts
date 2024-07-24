import { AxiosError } from 'axios'
import {
  LeaderboardAPI,
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
} from '@/api/leaderboard-api'

const leaderboard = new LeaderboardAPI()

export class LeaderboardController {
  public async addNewLeaderToLeaderboard(data: LeaderboardNewLeaderRequest) {
    if (!data) {
      throw new Error('No data')
    }

    try {
      return await leaderboard.addNewLeader(data)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.reason) {
        throw error.response.data.reason
      }
      throw error
    }
  }

  public async getTeamLeaderboard(data: LeaderboardRequest) {
    if (!data) {
      throw new Error('No data')
    }

    try {
      return await leaderboard.getTeam(data)
    } catch (error) {
      throw new Error(error as string)
    }
  }
}

export const leaderboardController = new LeaderboardController()
