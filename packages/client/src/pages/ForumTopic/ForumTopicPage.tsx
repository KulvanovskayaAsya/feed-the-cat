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
import { useAppDispatch, useSelector } from '@/store'
import { selectForumData } from '@/store/selectors/forum'
import { createCommentThunk } from '@/store/slices/forumSlice'

export const ForumTopicPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const dispatch = useAppDispatch()
  const { selectedTopic } = useSelector(selectForumData)

  const toggleModal = () => {
    setIsModalOpen(c => !c)
  }
  const handleAddMessage = () => {
    if (selectedTopic)
      dispatch(
        createCommentThunk({ topicId: selectedTopic.id, content: newMessage })
      ).then(() => {
        setNewMessage('')
        toggleModal()
      })
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
        <PixelHeader className={styles.topicName}>
          {selectedTopic?.title}
        </PixelHeader>
      </header>
      <main>
        <Flex vertical gap={32}>
          {selectedTopic?.comments.map(message => {
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
                    <div>{message.userId}</div>
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
          label="Message"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <PixelBorder />
      </Modal>
    </Flex>
  )
}
