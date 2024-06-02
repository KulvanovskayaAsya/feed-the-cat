import type { FC } from 'react'
import cls from './PixelBorder.module.css'

export const PixelBorder: FC = () => {
  return (
    <>
      <div className={cls.borderTop}></div>
      <div className={cls.borderRight}></div>
      <div className={cls.borderBottom}></div>
      <div className={cls.borderLeft}></div>
    </>
  )
}
