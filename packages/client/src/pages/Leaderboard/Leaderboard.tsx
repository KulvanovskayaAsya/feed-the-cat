import { Flex } from 'antd'
import { FC } from 'react'
import { PixelCard, PixelHeader, PixelAvatar } from '@/components'
import styles from './Leaderboard.module.css'
import tokens from '../../../tokens.json'
import { classNames } from '@/utils'

const currentUser = {
  id: 2,
}

const data = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  avatar: '',
  name: 'Name ' + Math.ceil(Math.random() * 5),
  score: Math.ceil(Math.random() * 100) + 100 * (5 - i),
}))

const firstPlaceColor = '#F8D028'

export const LeaderboardPage: FC = () => {
  return (
    <Flex
      vertical
      justify="space-around"
      align="center"
      gap={16}
      className={styles.page}>
      <header>
        <PixelHeader>LEADERBOARD</PixelHeader>
      </header>
      <main>
        <Flex vertical gap={32}>
          {data.map((row, rowIdx) => {
            return (
              <PixelCard
                key={row.id}
                className={classNames('', {
                  [styles.currentUserRow]: row.id === currentUser.id,
                })}>
                <Flex gap={32} className={styles.row}>
                  <PixelAvatar
                    src={row.avatar}
                    borderProps={{
                      size: 5,
                      color:
                        rowIdx === 0
                          ? firstPlaceColor
                          : tokens['color-accent-secondary'],
                    }}
                  />
                  <div>{row.name}</div>
                  <div>{row.score}</div>
                </Flex>
              </PixelCard>
            )
          })}
        </Flex>
      </main>
    </Flex>
  )
}
