import { FC } from 'react'
import { Mods, classNames } from '@/utils'

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
  const mods: Mods = {
    [cls[direction]]: true,
  }

  return (
    <img
      src={`/src/assets/arrow.jpeg`}
      alt={`${direction} arrow`}
      className={classNames(cls.arrow, mods, [className])}
      onClick={onClick}
    />
  )
}
