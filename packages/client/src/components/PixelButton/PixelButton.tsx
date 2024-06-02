import type { FC, ReactNode } from 'react'
import { Button } from 'antd'
import './PixelButton.css'
import { PixelBorder } from '../PixelBorder'
import { classNames } from '../../utils'

export interface PixelButtonProps {
  className?: string
  children?: ReactNode
}

export const PixelButton: FC<PixelButtonProps> = (props: PixelButtonProps) => {
  const { className, children } = props

  return (
    <Button className="pixel-button">
      <PixelBorder />

      <div
        className={classNames('pixel-button-background', {}, [
          className ?? '',
        ])}></div>

      {children}
    </Button>
  )
}
