import type { ReactNode } from 'react'
import { Navbar } from '../Navbar/Navbar'

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
