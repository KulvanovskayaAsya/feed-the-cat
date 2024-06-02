import type { FC, ReactNode } from 'react'
import { Button } from 'antd'
import cls from './PixelButton.module.css'
import { PixelBorder } from '../PixelBorder'
import { classNames } from '../../utils'

export interface PixelButtonProps {
  className?: string
  children?: ReactNode
}

export const PixelButton: FC<PixelButtonProps> = (props: PixelButtonProps) => {
  const { className, children } = props

  return (
    <Button className={classNames(cls.button, {}, [className ?? ''])}>
      <PixelBorder />

      <div className={cls.background}></div>

      {children}
    </Button>
  )
}
