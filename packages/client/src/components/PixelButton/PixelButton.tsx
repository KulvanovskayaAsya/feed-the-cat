import type { FC, ReactNode } from 'react'
import { Button } from 'antd'
import cls from './PixelButton.module.css'
import { PixelBorder } from '@/components'
import { classNames } from '@/utils'

export interface PixelButtonProps {
  className?: string
  children?: ReactNode
  onClick?: () => void
}

export const PixelButton: FC<PixelButtonProps> = (props: PixelButtonProps) => {
  const { className, children, onClick } = props

  return (
    <Button
      className={classNames(cls.button, {}, [className ?? ''])}
      onClick={onClick}>
      <PixelBorder />

      <div className={cls.background}></div>

      {children}
    </Button>
  )
}
