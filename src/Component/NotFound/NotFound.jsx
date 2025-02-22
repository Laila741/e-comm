import React from 'react'
import notfound from "../../assets/images/error.svg"
export default function NotFound() {
  return (
    <div className='w-1/2 m-auto'>
      <img src={notfound} alt="not found" className='w-full ' />
    </div>
  )
}
