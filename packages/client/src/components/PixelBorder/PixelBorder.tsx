import type { FC } from 'react'
import './PixelBorder.css'

export const PixelBorder: FC = () => {
  return (
    <>
      <div className="pixel-border-top"></div>
      <div className="pixel-border-right"></div>
      <div className="pixel-border-bottom"></div>
      <div className="pixel-border-left"></div>
    </>
  )
}
