import { Col, Flex, notification, Row, Spin } from 'antd'
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
  const [api, contextHolder] = notification.useNotification()
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

  useEffect(() => {
    if (error) {
      api.error({
        message: 'Error receiving Leaderboard data',
      })
    }
  }, [error])

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
        {contextHolder}

        <Spin spinning={isLoading} fullscreen size={'large'} />

        <Flex vertical gap={32}>
          {data.length === 0 && (
            <PixelCard>
              <Row justify="center" className={styles.row}>
                <Col span={3} className={styles.col}>
                  <div>No data</div>
                </Col>
              </Row>
            </PixelCard>
          )}

          {data.length > 0 && (
            <>
              <PixelCard>
                <Row justify="space-between" className={styles.row}>
                  <Col span={3} className={styles.col}>
                    <div>Avatar</div>
                  </Col>

                  <Col span={8} className={styles.col}>
                    <div>Login</div>
                  </Col>

                  <Col span={2} className={styles.col}>
                    <div>Level</div>
                  </Col>

                  <Col span={2} className={styles.col}>
                    <div>Life</div>
                  </Col>

                  <Col span={2} className={styles.col}>
                    <div>Time</div>
                  </Col>

                  <Col span={2} className={styles.col}>
                    <div>Win</div>
                  </Col>

                  <Col span={2} className={styles.col}>
                    <div>Scores</div>
                  </Col>
                </Row>
              </PixelCard>

              {data.map((row, rowIdx) => {
                return (
                  <PixelCard
                    key={row.data.id}
                    className={classNames('', {
                      [styles.currentUserRow]: row.data.id === currentUser.id,
                    })}>
                    <Row justify="space-between" className={styles.row}>
                      <Col span={3} className={styles.colAvatar}>
                        <PixelAvatar
                          className={styles.rowAvatar}
                          src={row.data.avatar}
                          borderProps={{
                            size: 5,
                            color:
                              rowIdx === 0
                                ? firstPlaceColor
                                : tokens['color-accent-secondary'],
                          }}
                        />
                      </Col>

                      <Col span={8} className={styles.col}>
                        <div>{row.data.login}</div>
                      </Col>

                      <Col span={2} className={styles.col}>
                        <div>{row.data.level}</div>
                      </Col>

                      <Col span={2} className={styles.col}>
                        <div>{row.data.life}</div>
                      </Col>

                      <Col span={2} className={styles.col}>
                        <div>{row.data.time}</div>
                      </Col>

                      <Col span={2} className={styles.col}>
                        <div>{row.data.isWin ? 'yes' : 'no'}</div>
                      </Col>

                      <Col span={2} className={styles.col}>
                        <div>{row.data.scores}</div>
                      </Col>
                    </Row>
                  </PixelCard>
                )
              })}
            </>
          )}
        </Flex>
      </main>
    </Flex>
  )
}
