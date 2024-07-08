import Home from '@/components/pages/Home'
import Welcome from '@/components/pages/Welcome/Welcome'
import React from 'react'
import { useLocation } from 'react-router-dom'

const page = () => {

  // const [animation, setAnimation] = React.useState(false)

	// const { pathname } = useLocation()

	// if (pathname === '/' && animation === false) {
	// 	return <Welcome setAnimation={setAnimation}/>
	// }
  return (
    <div>
      <Home/>
    </div>
  )
}

export default page