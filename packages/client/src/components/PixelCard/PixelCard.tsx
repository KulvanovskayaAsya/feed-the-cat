import type { FC, ReactNode } from 'react'
import { Card } from 'antd'
import cls from './PixelCard.module.css'
import { PixelBorder } from '@/components'
import { classNames } from '@/utils'

export interface PixelCardProps {
  className?: string
  children?: ReactNode
}

export const PixelCard: FC<PixelCardProps> = (props: PixelCardProps) => {
  const { className, children } = props

  return (
    <Card className={classNames(cls.card, {}, [className ?? ''])}>
      <PixelBorder />

      <div className={cls.background}></div>

      {children}
    </Card>
  )
}
