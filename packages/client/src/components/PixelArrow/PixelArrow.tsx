import { FC } from 'react'
import { classNames } from '@/utils'
import arrowImage from '@/assets/arrow.jpeg'
import cls from './PixelArrow.module.css'

interface PixelArrowProps {
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  onClick?: () => void
}

export const PixelArrow: FC<PixelArrowProps> = ({
  direction = 'right',
  className,
  onClick,
}) => {
  return (
    <img
      src={arrowImage}
      alt={`${direction} arrow`}
      className={classNames(cls.arrow, {}, [className, cls[direction]])}
      onClick={onClick}
    />
  )
}
