import { FC, useMemo, useState } from 'react'
import { Input, InputProps } from 'antd'
import { PixelBorder } from '@/components'
import theme from '@/styles/theme'
import styles from './PixelInput.module.css'
import { Mods, classNames } from '@/utils'

export interface PixelInput extends InputProps {
  label: string
  colors?: {
    error: string
    default: string
    focus: string
  }
  error?: boolean
}

export const PixelInput: FC<PixelInput> = ({
  label,
  value,
  colors = theme.color,
  onFocus,
  onBlur,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const color = useMemo(() => {
    if (props['aria-invalid'] || error) {
      return colors.error
    } else if (isFocused) {
      return colors.focus
    } else {
      return colors.default
    }
  }, [props['aria-invalid'], error, isFocused, colors])

  const mods: Mods = {
    [styles.focused]: isFocused || Boolean(value),
    [styles.error]: error,
  }

  return (
    <div className={classNames(styles.container, mods, [])}>
      <PixelBorder color={color} />
      <label className={classNames(styles.label, {}, [])} style={{ color }}>
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
