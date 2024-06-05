import { PixelBorder } from '../PixelBorder'
import { PixelBorderProps } from '../PixelBorder/PixelBorder'
import smallCat from '@/assets/smallCat.png'
import styles from './PixelAvatar.module.css'

type PixelAvatarProps = {
  src: string
  className?: string
  borderProps?: PixelBorderProps
}

export const PixelAvatar = (props: PixelAvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img src={props.src || smallCat} alt="User avatar" />
      <PixelBorder {...props.borderProps} />
    </div>
  )
}
