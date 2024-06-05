import { Flex, Modal } from 'antd'
import { FC, useState } from 'react'
import {
  PixelButton,
  PixelCard,
  PixelHeader,
  PixelAvatar,
  PixelBorder,
  PixelInput,
} from '@/components'
import smallCat from '@/assets/smallCat.png'
import styles from './ForumTopicPage.module.css'
import tokens from '../../../tokens.json'

const topicData = {
  name: 'Topic Name',
}
const data = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  avatar: '',
  name: 'Name ' + Math.ceil(Math.random() * 5),
  content: 'Some text ' + i,
}))

export const ForumTopicPage: FC = () => {
  const [messages, setMessages] = useState(data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  const toggleModal = () => {
    setIsModalOpen(c => !c)
  }
  const handleAddMessage = () => {
    setMessages(old => [
      ...old,
      {
        id: old.length + 1,
        avatar: '',
        name: 'Name',
        content: newMessage,
      },
    ])
    setNewMessage('')
    toggleModal()
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
        <PixelHeader className={styles.topicName}>{topicData.name}</PixelHeader>
      </header>
      <main>
        <Flex vertical gap={32}>
          {messages.map(message => {
            return (
              <PixelCard key={message.id}>
                <Flex gap={32} className={styles.messageRow}>
                  <PixelAvatar
                    src={message.avatar}
                    borderProps={{
                      size: 5,
                      color: tokens['color-accent-secondary'],
                    }}
                  />
                  <div>
                    <div>{message.name}</div>
                    <div>{message.content}</div>
                  </div>
                </Flex>
              </PixelCard>
            )
          })}
        </Flex>
      </main>
      <footer>
        <PixelButton onClick={toggleModal}>Add new message</PixelButton>
      </footer>

      <Modal
        title={<div className={styles.modalTitle}>New message</div>}
        open={isModalOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={
          <div className={styles.modalFooter}>
            <PixelButton
              className={styles.sendButton}
              onClick={handleAddMessage}>
              Send
            </PixelButton>
          </div>
        }>
        <PixelInput
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <PixelBorder />
      </Modal>
    </Flex>
  )
}
