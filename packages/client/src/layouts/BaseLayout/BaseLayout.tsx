import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import cls from './BaseLayout.module.css'

export interface PageProps {
  children?: ReactNode
}

export const BaseLayout: FC<PageProps> = (props: PageProps) => {
  return (
    <div className={cls.baseLayout}>
      <Outlet />
    </div>
  )
}
