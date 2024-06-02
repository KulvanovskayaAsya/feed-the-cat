import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import './BaseLayout.css'

export interface PageProps {
  children?: ReactNode
}

export const BaseLayout: FC<PageProps> = (props: PageProps) => {
  return (
    <main className="base-layout">
      <Outlet />
    </main>
  )
}
