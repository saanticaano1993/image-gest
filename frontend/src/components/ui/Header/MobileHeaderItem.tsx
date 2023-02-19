import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export type MobileHeaderItemProps = {
  href: string,
  children: ReactNode,
  setNavOpen: (navState: boolean) => void
}

function MobileHeaderItem({ href="", children, setNavOpen} : MobileHeaderItemProps) {
  return (
    <Link to={href}>
      <div onClick={() => setNavOpen(false)} className='cursor-pointer'>
        {children}
      </div>
    </Link>
  )
}

export default MobileHeaderItem