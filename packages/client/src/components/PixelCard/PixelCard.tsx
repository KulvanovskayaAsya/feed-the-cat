import type { FC, ReactNode } from 'react'
import { Card } from 'antd'
import './PixelCard.css'
import { PixelBorder } from '../PixelBorder'
import { classNames } from '../../utils'

export interface PixelCardProps {
  className?: string
  children?: ReactNode
}

export const PixelCard: FC<PixelCardProps> = (props: PixelCardProps) => {
  const { className, children } = props

  return (
    <Card className={classNames('pixel-card', {}, [className ?? ''])}>
      <PixelBorder />

      <div className="pixel-card-background"></div>

      {children}
    </Card>
  )
}
