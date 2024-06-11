import { Flex } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { PixelButton, PixelCard, PixelHeader } from '@/components'
import smallCat from '@/assets/smallCat.png'
import styles from './ForumPage.module.css'

const fakeTopics = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  name: 'Level ' + (i + 1),
  messageCount: Math.ceil(Math.random() * 10),
}))

export const ForumPage: FC = () => {
  const navigate = useNavigate()
  const handleCreate = () => navigate('/forum/topic/create')
  const handleSelect = (id: number) => navigate('/forum/topic/' + id)

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
          {fakeTopics.map(topic => {
            return (
              <div
                key={String(topic.id)}
                onClick={() => handleSelect(topic.id)}
                className={styles.topicRowWrapper}>
                <PixelCard>
                  <Flex justify="space-between" className={styles.topicRow}>
                    <div>{topic.name}</div>
                    <div>{topic.messageCount}</div>
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
