import { ReactNode } from 'react'
import { PixelBorder } from '../PixelBorder'
import { PixelBorderProps } from '../PixelBorder/PixelBorder'
import styles from './PixelLink.module.css'
import { classNames } from '@/utils'
import { Link } from 'react-router-dom'

type PixelLinkProps = {
  borderProps?: PixelBorderProps
  to: string
  className?: string
  children?: ReactNode
}

export const PixelLink = (props: PixelLinkProps) => {
  const { className, borderProps, to, children } = props
  return (
    <div className={styles.linkWrapper}>
      <PixelBorder {...borderProps} />
      <Link className={classNames(styles.link, {}, [className])} to={to}>
        {children}
      </Link>
    </div>
  )
}
