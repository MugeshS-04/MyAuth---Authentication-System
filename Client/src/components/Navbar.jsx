import {React, useContext, useState} from 'react'
import myimg from './../assets/image1.png'
import userimg from './../assets/user_dp.avif'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Navbar = () => {
  const Navigate = useNavigate()
  const {isLoggedIn, setUserData, setIsLoggedIn, backendUrl, userData} = useContext(AppContext)


  const sendVerificationOTP = async () => {

    axios.defaults.withCredentials = true;
    
    try {
        // axios.defaults.withCredentials = true

        const{data} = await axios.post(backendUrl + "api/auth/send-verify-otp")

        if(data.success)
        {
          Navigate('/verifyemail')
          toast.dark(data.message)
        }
      } catch (error) {
        
        toast.dark(error.message)
    }
  }

  const logout = async () => {
    axios.defaults.withCredentials = true;
    try {
        await axios.post(backendUrl + 'api/auth/logout');
        setUserData(false);
        setIsLoggedIn(false);
        Navigate('/');
        toast.dark("Logged Out Successfully!");
    } catch (error) {
        console.error(error); // to debug actual error
        toast.dark("Logout failed!");
    }
  }
  return (
    <div className='w-full flex items-center p-4 sm:p-6 sm: px-4 absolute top-0 text-3xl'>
      <img src={myimg} alt="logo" className='ml-5 flex justify-between w-16 h-16 rounded-full' />
      <h2 className='text-4xl ml-5 cursor-default'>MyAuth</h2>

      {isLoggedIn ? (
        <>
        {/* <button onClick={() => Navigate('/logout')} className='absolute right-32 flex ml-auto items-center gap-2 border border-500 rounded-full px-6 py-2 text-800 cd  hover:bg-gray-50 hover:text-black transition-all'>Login</button> */}
        <div className="group">
        <img src={userimg} alt='user' className='absolute top-7 right-12 rounded-full w-16 h-16 border border-500' />
        <div className="absolute hidden group-hover:block top-15 right-10 z-10 bg-transparent text-beige rounded p-10 cursor-pointer">
          <ul className="list-none p-5 mt-0 border-[1px] rounded-md text-2xl">
              {userData.AccountVerified ? ( <li onClick={logout} className="hover:bg-gray-50 rounded hover:text-black transition-all p-3">Log Out</li>) : (<>
                <li onClick={sendVerificationOTP} className="hover:bg-gray-50 rounded hover:text-black transition-all p-3">Verify Account</li>
                <li onClick={logout} className="hover:bg-gray-50 rounded hover:text-black transition-all p-3">Log Out</li>
                </>
               )}
          </ul>
        </div>
        </div>
        </>
       ) : (
        <button onClick={() => Navigate('/login')} className='absolute right-10 flex ml-auto items-center gap-2 border border-500 rounded-full px-6 py-2 text-800 cd  hover:bg-gray-50 hover:text-black transition-all'>Login</button>
      ) 
      } 
    </div>
  )
}

export default Navbar
