import React from 'react'
import { useState } from 'react'

function Login(){

  const [state, setState] = useState('Log-In')

  function change(e) {
    setState((prevState) => (prevState === 'Log-In' ? 'Sign-Up' : 'Log-In'));
  }

  return (
    <div className=" p-10">
      <h1 className="text-5xl md:text-7xl font-bold text-center mt-10 mb-20">
        {state === 'Sign-Up' ? 'Create Account' : 'Login Account'}
      </h1>
      <p className="text-2xl md:text-2xl font-bold text-center mt-10 mb-20">
        {state === 'Sign-Up' ? 'Create your Account' : 'Login to your Account'}
      </p>

    <form className="flex flex-col items-center space-y-8">
  
      {/* Name */}
      <div className="flex flex-col md:flex-row items-center gap-6">
      {state === 'Sign-Up' ? (<input
          type="text"
          placeholder="Name"
          className="w-full h-16 p-5 text-2xl border border-beige rounded-full"
        />) : null}
        
      </div>
  
      {/* Email */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        
        <input
          type="text"
          placeholder="Email"
          className="w-full h-16 p-5 text-2xl border border-beige rounded-full"
        />
      </div>
  
      {/* Password */}
      <div className="flex flex-col md:flex-row items-center gap-6">
         
        <input
          type="password"
          placeholder="Password"
          className="w-full h-16 p-5 text-2xl border border-beige rounded-full"
        />
      </div>
  
      {/* Confirm Password */}
      <div className="flex flex-col md:flex-row items-center gap-6">
      {state === 'Sign-Up' ? (<input
          type="password"
          placeholder="Confirm Password"
          className="w-full h-16 p-5 text-2xl border border-beige rounded-full"
        />) : null}
        
      </div>
  
      {/* Already have account */}
      <p className="text-xl">
        {state === 'Log-In' ? (<a className="text-blue-600 hover:underline cursor-pointer">Forgot Password?</a>) : null} 
      </p>

      <p className="text-xl">
        {state === 'Sign-Up' ? ( <p>Already have an account?<a className="text-blue-600 hover:underline cursor-pointer" onClick={change}>Log in</a></p>) : (<p>Don't have an account?<a className="text-blue-600 hover:underline cursor-pointer" onClick={change}> Sign Up</a></p>)}
      </p>
  
      {/* Submit Button */}
      <button
        type='button'
        className="w-60 h-14 hover:bg-gray-50 hover:text-black text-2xl rounded-full border border-beige">
        {state}
      </button>
    </form>
  </div>
  
  )
}

export default Login
