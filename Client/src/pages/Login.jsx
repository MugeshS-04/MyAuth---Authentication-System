import React, { useContext } from 'react'
import { useState } from 'react'
import myimg from './../assets/image1.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext, AppProvider } from '../context/AppContext.jsx'

function Login(){

  const [state, setState] = useState('Log-In')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Con_Password, setConPass] = useState('')

  const Navigate = useNavigate()

  const {backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext)
  
  function change(e) {
    setState((prevState) => (prevState === 'Log-In' ? 'Sign-Up' : 'Log-In'));
  }
  
  const onsubmitHandler = async(e) => {

    axios.defaults.withCredentials = true;

    try {
      
      e.preventDefault()
       
      if(state === 'Sign-Up')
        {
         
          if (password !== Con_Password) {
            return toast.error("Passwords do not match");
          }
          else{
            const {data} = await axios.post(backendUrl + 'api/auth/register', {name, email, password})

            if(data.success)
            {
                setIsLoggedIn(true)
                getUserData()
                Navigate('/')
                toast.success("Created Successfully!")
              }else{
                toast.error(data.message)
              }
            }
          }
          else{
            const {data} = await axios.post(backendUrl + 'api/auth/login', {email, password})
            
            if(data.success)
              {
                setIsLoggedIn(true)
                getUserData()
                Navigate('/')
                toast.success("Logged In Successfully!")
        }else{
          toast.error(data.message)
        }

      }

      
    } catch (error) {
        toast.error(error)
    }
    
  }

  return (
    <div>

      <div className='flex items-center p-4 sm:p-6 sm: px-4 absolute top-0 text-3xl'>
          <img  onClick={() => Navigate('/')} src={myimg} alt="logo" className='ml-0 md:ml-5 flex justify-between w-16 h-16 md:w-16 md:h-16 rounded-full' />
          <h2   onClick={() => Navigate('/')}className='ml-3 text-[26px] md:text-4xl md:ml-5 cursor-default'>MyAuth</h2>
      </div>
      

      <h1 className="text-5xl md:text-7xl font-bold text-center mt-40 md:mt-32 md:mb-20">
        {state === 'Sign-Up' ? 'Create' : 'Login'}
      </h1>
      <p className="text-2xl md:text-2xl font-bold text-center mt-10 mb-10 md:mt-10 md:mb-20">
        {state === 'Sign-Up' ? 'Create your Account' : 'Login to your Account'}
      </p>

    <form onSubmit={onsubmitHandler} className="flex flex-col items-center space-y-8">
  
      {/* Name */}
      <div className="flex flex-col md:flex-row items-center gap-6">
      {state === 'Sign-Up' ? (
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          className="w-full h-16 p-5 text-2xl border border-beige rounded-full"
          required
        />) : null}
        
      </div>
  
      {/* Email */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="w-full h-16 p-5 text-2xl border border-beige rounded-full"
          required
        />
      </div>
  
      {/* Password */}
      <div className="flex flex-col md:flex-row items-center gap-6">
         
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="w-full h-16 p-5 text-2xl border border-beige rounded-full"
          required 
        />
      </div>
  
      {/* Confirm Password */}
      <div className="flex flex-col md:flex-row items-center gap-6">
      {state === 'Sign-Up' ? (
        <input
          type="password"
          onChange={(e) => setConPass(e.target.value)}
          value={Con_Password}
          placeholder="Confirm Password" 
          className="w-full h-16 p-5 text-2xl border border-beige rounded-full"
          required
        />) : null}
        
      </div>
  
      {/* Already have account */}
      <p className="text-xl">
        {state === 'Log-In' ? (<a onClick={() => Navigate('/reset-password')} className="text-blue-600 hover:underline cursor-pointer">Forgot Password?</a>) : null} 
      </p>

      <div className="text-xl">
        {state === 'Sign-Up' ? (
            <span>
                  Already have an account?{' '}
                  <a className="text-blue-600 hover:underline cursor-pointer" onClick={change}>Log in</a>
            </span>
        ) : (
            <span>
              Don't have an account?{' '}
              <a className="text-blue-600 hover:underline cursor-pointer" onClick={change}>Sign Up</a>
            </span>
            )}
      </div>
  
      {/* Submit Button */}
      <button
        type='submit'
        className="w-60 h-14 hover:bg-gray-50 hover:text-black text-2xl rounded-full border border-beige">
        {state}
      </button>
    </form>
  </div>
  
  )
}

export default Login
