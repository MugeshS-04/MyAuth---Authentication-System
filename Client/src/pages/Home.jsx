import React from 'react'
import Navbar from '../components/Navbar'
import bg from './../assets/forest.png'

function Home() {
  return (
    <div >
      <Navbar/>
      <h1 className="w-auto text-9xl font-bold flex justify-center items-center mt-48 mb-2 animate-fade-in">WELCOME</h1>
      <h1 className="w-auto text-9xl font-bold flex justify-center items-center mt-10 mb-2 animate-fade-in">TO</h1>
      <h1 className="w-auto text-9xl font-bold flex justify-center items-center mt-10 mb-2 animate-fade-in">MYAUTH</h1>
    </div>
  )
}

export default Home
