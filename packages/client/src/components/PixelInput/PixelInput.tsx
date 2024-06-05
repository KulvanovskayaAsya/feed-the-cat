import { Input, InputProps } from 'antd'
import { PixelBorder } from '../PixelBorder'
import styles from './PixelInput.module.css'
import { FC, useEffect, useState } from 'react'

export interface InputWithLabelProps extends InputProps {
  label: string
  colors: {
    error: string
    default: string
    focus: string
  }
  error?: boolean
}

export const PixelInput: FC<InputWithLabelProps> = ({
  label,
  value,
  colors,
  onFocus,
  onBlur,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [сolor, setСolor] = useState(colors.default)

  useEffect(() => {
    if (error) {
      setСolor(colors.error)
    } else if (isFocused) {
      setСolor(colors.focus)
    } else {
      setСolor(colors.default)
    }
  }, [error, isFocused, colors])

  return (
    <div
      className={`${styles.container} ${
        isFocused || value ? styles.focused : ''
      } ${error ? styles.error : ''}`}>
      <PixelBorder color={сolor} />
      <label
        className={styles.label}
        style={{
          color: error
            ? colors.error
            : isFocused
            ? colors.focus
            : colors.default,
        }}>
        {label}
      </label>
      <Input
        className={styles.input}
        onFocus={e => {
          setIsFocused(true)
          onFocus && onFocus(e)
        }}
        onBlur={e => {
          setIsFocused(false)
          onBlur && onBlur(e)
        }}
        {...props}
      />
    </div>
  )
}
