import { Input, InputProps } from 'antd'
import { PixelBorder } from '../PixelBorder'
import { PixelBorderProps } from '../PixelBorder/PixelBorder'
import styles from './PixelInput.module.css'

type PixelInputProps = {
  borderProps?: PixelBorderProps
}

export const PixelInput = (props: PixelInputProps & InputProps) => {
  return (
    <div className={styles['input-wrapper']}>
      <PixelBorder {...props.borderProps} />
      <Input className={styles['input']} {...props}></Input>
    </div>
  )
}
