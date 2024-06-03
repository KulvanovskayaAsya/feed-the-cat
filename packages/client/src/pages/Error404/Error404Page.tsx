import type { FC } from 'react'
import { Flex } from 'antd'
import cls from './Error404Page.module.css'
import { PixelButton, PixelCard, PixelHeader } from '@/components'
import smallCat from '@/assets/smallCat.png'
import { useNavigate } from 'react-router-dom'

export const Error404Page: FC = () => {
  const navigate = useNavigate()
  const handleClick = () => navigate('/')

  return (
    <Flex align="center" justify="center" vertical>
      <header className={cls.header}>
        <PixelHeader>
          FEED THE <img className={cls.image} src={smallCat} alt="cat" /> CAT
        </PixelHeader>
      </header>

      <main>
        <Flex align="center" justify="center" vertical>
          <PixelCard className={cls.card}>
            <Flex align="center" justify="flex-start" vertical>
              <h2 className={cls.h2}>OOPS</h2>
              <p className={cls.text}>Sorry, the page not found</p>
            </Flex>
          </PixelCard>

          <PixelButton onClick={handleClick}>MAIN MENU</PixelButton>
        </Flex>
      </main>
    </Flex>
  )
}
