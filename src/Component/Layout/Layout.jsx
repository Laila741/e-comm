import React from 'react'

import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navebar/Navbar'

export default function Layout() {
  return (
<>
<Navbar/>
<div className=' mt-20'>
<Outlet/>
</div>

<Footer/>
</>
  )
}
