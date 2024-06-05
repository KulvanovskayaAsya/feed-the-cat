import type { FC } from 'react'
import cls from './PixelBorder.module.css'

export type PixelBorderProps = {
  size?: number
  color?: string
}

export const PixelBorder: FC<PixelBorderProps> = props => {
  return (
    <>
      <div
        className={cls.borderTop}
        style={{
          height: props.size,
          backgroundColor: props.color,
          inset: `-${props.size}px 0 0 0`,
        }}
      />
      <div
        className={cls.borderRight}
        style={{
          width: props.size,
          backgroundColor: props.color,
          inset: `0 -${props.size}px 0 100%`,
        }}
      />
      <div
        className={cls.borderBottom}
        style={{
          height: props.size,
          backgroundColor: props.color,
          inset: `100% 0 -${props.size}px 0`,
        }}
      />
      <div
        className={cls.borderLeft}
        style={{
          width: props.size,
          backgroundColor: props.color,
          inset: `0 100% 0 -${props.size}px`,
        }}
      />
    </>
  )
}
