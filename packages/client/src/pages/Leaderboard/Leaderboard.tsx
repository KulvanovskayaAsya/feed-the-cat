import { Flex } from 'antd'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './Leaderboard.module.css'
import { PixelCard, PixelHeader, PixelAvatar } from '@/components'
import tokens from '../../../tokens.json'
import { classNames } from '@/utils'
import { useAppDispatch } from '@/store'
import { leaderboardSelectors, userSelectors } from '@/store/selectors'
import { get } from '@/store/slices/leaderboardSlice'
import type { LeaderboardRequest } from '@/api/leaderboard-api'

const firstPlaceColor = '#F8D028'

export const LeaderboardPage: FC = () => {
  const dispatch = useAppDispatch()

  const data = useSelector(leaderboardSelectors.leaderboard)
  const error = useSelector(leaderboardSelectors.error)
  const isLoading = useSelector(leaderboardSelectors.isLoading)

  const currentUser = useSelector(userSelectors.user)

  useEffect(() => {
    const getLeaderboardData = async (body: LeaderboardRequest) => {
      await dispatch(get(body))
    }

    const body = {
      ratingFieldName: 'scores',
      cursor: 0,
      limit: 100,
    }

    getLeaderboardData(body)
  }, [])

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
                key={row.data.id}
                className={classNames('', {
                  [styles.currentUserRow]: row.data.id === currentUser.id,
                })}>
                <Flex gap={32} className={styles.row}>
                  <PixelAvatar
                    src={row.data.avatar}
                    borderProps={{
                      size: 5,
                      color:
                        rowIdx === 0
                          ? firstPlaceColor
                          : tokens['color-accent-secondary'],
                    }}
                  />
                  {row.data.display_name && <div>{row.data.display_name}</div>}
                  {!row.data.display_name && <div>{row.data.login}</div>}
                  <div>{row.data.life}</div>
                  <div>{row.data.time}</div>
                  <div>{row.data.scores}</div>
                </Flex>
              </PixelCard>
            )
          })}
        </Flex>
      </main>
    </Flex>
  )
}
