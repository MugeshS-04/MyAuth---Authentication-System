import React from 'react'
import { useState } from 'react'

function Login(){

  const [state, setState] = useState('Sign-Up')


  return (
    <div className="text-7xl font-bold flex justify-center items-center mt-10"> 
        <h1>{state === 'Sign-Up' ? 'Create your Account' : 'Log-In to your Account'}</h1>
    </div>
  )
}

export default Login
