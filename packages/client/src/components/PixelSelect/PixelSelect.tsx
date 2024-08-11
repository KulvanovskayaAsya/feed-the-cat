import { Select, SelectProps } from 'antd'
import { PixelBorder } from '../PixelBorder'
import { PixelBorderProps } from '../PixelBorder/PixelBorder'
import styles from './PixelSelect.module.css'
import { classNames } from '@/utils'
import { useState } from 'react'

type PixelSelectProps = {
  borderProps?: PixelBorderProps
}

export const PixelSelect = (props: PixelSelectProps & SelectProps) => {
  const { className, borderProps, ...rest } = props
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  return (
    <div className={styles.selectWrapper}>
      <PixelBorder {...borderProps} />
      <Select
        className={classNames(styles.select, {}, [className])}
        variant={'borderless'}
        suffixIcon={
          <span
            className={classNames(styles.selectArrow, {
              [styles.selectArrowOpen]: isOpenDropdown,
            })}>
            V
          </span>
        }
        onDropdownVisibleChange={(open: boolean) => setIsOpenDropdown(open)}
        popupClassName={styles.selectPopup}
        {...rest}
        optionRender={option => (
          <div className={classNames(styles.selectOption)}>
            {option.label} {props.value}
          </div>
        )}
        labelRender={({ label }) => (
          <span className={styles.selectLabel}>{label}</span>
        )}
      />
    </div>
  )
}
