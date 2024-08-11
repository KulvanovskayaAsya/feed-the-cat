import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Flex, notification, Spin, Typography } from 'antd'
import { PixelButton } from '@/components/PixelButton'
import cls from './GameEnd.module.css'
import { useAppDispatch } from '@/store'
import type { LeaderboardNewLeaderRequest } from '@/api/leaderboard-api'
import { leaderboardSelectors, userSelectors } from '@/store/selectors'
import { add } from '@/store/slices/leaderboardSlice'
import { TEAM_NAME } from '@/api/urls'

const { Title, Text, Paragraph } = Typography

interface GameEndProps {
  gameData: {
    scores: number
    level: number
    time: string
    life: number
    isWin: boolean | null
  }
  onPlayAgain: () => void
  onMainMenu: () => void
}

export const GameEnd: FC<GameEndProps> = ({
  gameData,
  onPlayAgain,
  onMainMenu,
}) => {
  const [api, contextHolder] = notification.useNotification()
  const dispatch = useAppDispatch()

  const error = useSelector(leaderboardSelectors.error)
  const isLoading = useSelector(leaderboardSelectors.isLoading)

  const currentUser = useSelector(userSelectors.user)

  useEffect(() => {
    const addNewLeader = async (body: LeaderboardNewLeaderRequest) => {
      await dispatch(add(body))
    }

    const body: LeaderboardNewLeaderRequest = {
      data: {
        ...currentUser,
        ...gameData,
      },
      ratingFieldName: 'scores',
      teamName: TEAM_NAME,
    }

    addNewLeader(body)
  }, [])

  useEffect(() => {
    if (error) {
      api.error({
        message: 'Error sending Leaderboard data',
      })
    }
  }, [error])

  return (
    <>
      {contextHolder}

      <Spin spinning={isLoading} fullscreen size={'large'} />

      {gameData.isWin ? (
        <Title className={cls.centerText}>
          Congratulations on your victory!
        </Title>
      ) : (
        <Title className={cls.centerText}>Lose the game, don't be upset!</Title>
      )}

      <Flex vertical align="start">
        <Title level={2}>Game results</Title>

        <Paragraph>
          <Text strong>Scores: </Text>
          {gameData.scores}
        </Paragraph>

        <Paragraph>
          <Text strong>Level: </Text>
          {gameData.level}
        </Paragraph>

        <Paragraph>
          <Text strong>Time: </Text>
          {gameData.time}
        </Paragraph>

        <Paragraph>
          <Text strong>Lives: </Text>
          {gameData.life}
        </Paragraph>
      </Flex>

      <Flex gap="middle">
        <PixelButton onClick={onPlayAgain}>Play again</PixelButton>
        <PixelButton onClick={onMainMenu}>Main menu</PixelButton>
      </Flex>
    </>
  )
}
