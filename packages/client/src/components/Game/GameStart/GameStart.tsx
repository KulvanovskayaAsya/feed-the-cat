import { FC } from 'react'
import { Carousel, Flex, Typography } from 'antd'
import { PixelButton, PixelArrow } from '@/components'
import { HEROES } from '@/components/Game/data'

import cls from './GameStart.module.css'

const { Title } = Typography

interface GameStartProps {
  onStartGame: () => void
  onCarouselChange: (currentSlide: number) => void
}

export const GameStart: FC<GameStartProps> = ({
  onStartGame,
  onCarouselChange,
}) => {
  return (
    <Flex vertical align="center">
      <Title className={cls.centerText}>Choose your hero!</Title>

      <div className={cls.heroChoose}>
        <Carousel
          arrows
          draggable={true}
          infinite={false}
          beforeChange={(_, next) => onCarouselChange(next)}
          dots={false}
          centerMode={true}
          centerPadding="35px"
          slidesToShow={1}
          prevArrow={
            <PixelArrow className={cls.carouselArrow} direction="left" />
          }
          nextArrow={
            <PixelArrow className={cls.carouselArrow} direction="right" />
          }>
          {Array.from({ length: HEROES }).map((_, index) => (
            <div key={index} className={cls.carouselItem}>
              <div className={cls.imageContainer}>
                <img
                  className={cls.heroImage}
                  src={`/src/assets/heroes/${index + 1}/heroDown.png`}
                  alt={`Hero ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <PixelButton onClick={onStartGame} style={{ marginTop: '20px' }}>
        Start game
      </PixelButton>
    </Flex>
  )
}
