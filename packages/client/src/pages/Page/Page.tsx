import type { FC, ReactNode } from 'react'
import './Page.css'

export interface PageProps {
  children?: ReactNode
}

export const Page: FC<PageProps> = (props: PageProps) => {
  const { children } = props

  return <main className="Page">{children}</main>
}
