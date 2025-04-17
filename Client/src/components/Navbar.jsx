import React from 'react'
import myimg from './../assets/image1.png'
import userimg from './../assets/user.jpg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const Navigate = useNavigate()
  return (
    <div className='w-full flex items-center p-4 sm:p-6 sm: px-4 absolute top-0 text-3xl'>
      <img src={myimg} alt="logo" className='ml-5 flex justify-between w-16 h-16 rounded-full' />
      <h2 className='text-4xl ml-5 cursor-default'>MyAuth</h2>
      <button onClick={() => Navigate('/login')} className='absolute right-32 flex items-center gap-2 border border-500 rounded-full px-6 py-2 text-800 cd  hover:bg-gray-50 hover:text-black transition-all'>Login</button>
      <img src={userimg} alt='user' className='absolute right-10 rounded-full w-16 h-16 border border-500'></img>
    </div>
  )
}

export default Navbar
