import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import Account from './pages/Account'

function App()
{
  return(
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/verifyemail' element={<EmailVerify/>}></Route>
        <Route path='/account' element={<Account/>}></Route>
      </Routes>
    </>
  )
}

export default App

