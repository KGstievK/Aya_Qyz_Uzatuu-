import { FC, ReactNode } from 'react'
import scss from './LayoutSide.module.scss'

interface LovePage {
  children: ReactNode,
}

const LayoutSide: FC<LovePage> = ({children}) => {
  return (
    <div className={scss.LayoutSide}>
      <main>
        {children}
      </main>
    </div>
  )
}

export default LayoutSide