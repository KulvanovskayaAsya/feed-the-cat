import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { PixelButton } from '@/components/PixelButton'
import cls from './GameEnd.module.css'

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
  return (
    <>
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
