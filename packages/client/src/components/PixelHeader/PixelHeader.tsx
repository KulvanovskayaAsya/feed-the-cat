import type { FC, ReactNode } from 'react'
import './PixelHeader.css'
import { classNames } from '../../utils'

export interface PixelHeaderProps {
  className?: string
  children?: ReactNode
}

export const PixelHeader: FC<PixelHeaderProps> = (props: PixelHeaderProps) => {
  const { className, children } = props

  return (
    <h1 className={classNames('pixel-header', {}, [className ?? ''])}>
      {children}
    </h1>
  )
}
