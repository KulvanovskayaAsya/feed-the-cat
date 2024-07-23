import { FC, useEffect, useState } from 'react'
import cls from './PixelSlider.module.css'
import { SoundOutlined, StopOutlined } from '@ant-design/icons'
import { Flex, Slider, Typography } from 'antd'

interface IconSliderProps {
  max: number
  min: number
  onSetVolume: (volume: number) => void
}

export const PixelSlider: FC<IconSliderProps> = props => {
  const { max, min, onSetVolume } = props
  const [value, setValue] = useState(100)

  const mid = Number(((max - min) / 2).toFixed(5))
  const preColorCls = value <= mid ? '' : cls.iconWrapperActive
  const nextColorCls = value <= mid ? cls.iconWrapperActive : ''

  useEffect(() => {
    onSetVolume(value)
  }, [value])

  return (
    <Flex gap="small">
      <Typography>Volume:</Typography>

      <Flex gap="middle" className={cls.iconWrapper}>
        <StopOutlined className={preColorCls} />
        <Slider
          {...props}
          onChange={setValue}
          value={value}
          className={cls.slider}
        />
        <SoundOutlined className={nextColorCls} />
      </Flex>

      <Typography>{value} %</Typography>
    </Flex>
  )
}
