import { Input, InputProps } from 'antd'
import { PixelBorder } from '../PixelBorder'
import { PixelBorderProps } from '../PixelBorder/PixelBorder'
import styles from './PixelInput.module.css'
import { classNames } from '@/utils'

type PixelInputProps = {
  borderProps?: PixelBorderProps
}

export const PixelInput = (props: PixelInputProps & InputProps) => {
  const { className, borderProps, ...rest } = props
  return (
    <div className={styles.inputWrapper}>
      <PixelBorder {...borderProps} />
      <Input className={classNames(styles.input, {}, [className])} {...rest} />
    </div>
  )
}
