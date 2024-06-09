import { Flex } from 'antd'
import { FC, useState } from 'react'
import { PixelButton, PixelHeader, PixelInput } from '@/components'
import styles from './ForumTopicCreation.module.css'
import { useNavigate } from 'react-router-dom'
import { withAuth } from '@/utils/HOCs/withAuth'

export const ForumTopicCreationPage: FC = () => {
  const navigate = useNavigate()
  const [topicName, setTopicName] = useState('')

  const handleCreate = () => {
    navigate('/forum')
  }

  return (
    <Flex
      vertical
      justify="space-around"
      align="center"
      gap={16}
      className={styles.page}>
      <header>
        <PixelHeader className={styles.topicName}>CREATE NEW TOPIC</PixelHeader>
      </header>
      <main>
        <PixelInput
          className={styles.input}
          label="Title"
          value={topicName}
          onChange={e => setTopicName(e.target.value)}
        />
      </main>
      <footer>
        <PixelButton onClick={handleCreate}>CREATE</PixelButton>
      </footer>
    </Flex>
  )
}

export const ForumTopicCreationPageWithAuth = withAuth(ForumTopicCreationPage)
