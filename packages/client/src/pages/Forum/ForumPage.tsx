import { Flex } from 'antd'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PixelButton, PixelCard, PixelHeader } from '@/components'
import smallCat from '@/assets/smallCat.png'
import styles from './ForumPage.module.css'
import { PATHS } from '@/constants'
import { useAppDispatch, useSelector } from '@/store'
import { getForumListThunk, getTopicByIdThunk } from '@/store/slices/forumSlice'
import { selectForumData } from '@/store/selectors/forum'

export const ForumPage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { topicList } = useSelector(selectForumData)

  useEffect(() => {
    if (!topicList) dispatch(getForumListThunk())
  }, [dispatch])

  const handleCreate = () => navigate(PATHS.TOPIC_CREATE)
  const handleSelect = (id: number) => {
    dispatch(getTopicByIdThunk(String(id))).then(() =>
      navigate(PATHS.TOPIC(String(id)))
    )
  }

  return (
    <Flex
      vertical
      justify="space-around"
      align="center"
      gap={16}
      className={styles.page}>
      <header>
        <PixelHeader>
          FEED THE <img src={smallCat} alt="cat" /> CAT
        </PixelHeader>
      </header>
      <main>
        <Flex vertical gap={16}>
          <Flex justify="space-between" className={styles.headerRow}>
            <div>Name</div>
            <div>Messages</div>
          </Flex>
          {topicList.map(topic => {
            return (
              <div
                key={String(topic.id)}
                onClick={() => handleSelect(topic.id)}
                className={styles.topicRowWrapper}>
                <PixelCard>
                  <Flex justify="space-between" className={styles.topicRow}>
                    <div>{topic.title}</div>
                    <div>{topic.comments.length}</div>
                  </Flex>
                </PixelCard>
              </div>
            )
          })}
        </Flex>
      </main>
      <footer>
        <PixelButton onClick={handleCreate}>Create new topic</PixelButton>
      </footer>
    </Flex>
  )
}
