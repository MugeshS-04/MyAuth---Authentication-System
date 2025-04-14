import React from 'react'
import myimg from './../assets/image1.png'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm: px-4 absolute top-0 text-3xl'>
      <h2 className='text-4xl'>MyAuth</h2>
      <button className='flex items-center gap-2 border border-500 rounded-full px-6 py-2 text-800 hover:bg-gray-100 hover:text-black transition-all'>Login</button>
    </div>
  )
}

export default Navbar
