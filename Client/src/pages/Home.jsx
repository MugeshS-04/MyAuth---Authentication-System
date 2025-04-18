import {React, useContext} from 'react'
import Navbar from '../components/Navbar'
import bg from './../assets/forest.png'
import { AppContext } from '../context/AppContext'

function Home() {
  const {userData} = useContext(AppContext)
  return (
    <div >
      <Navbar/>

      <h1 className="w-auto text-5xl font-bold flex justify-center items-center mt-40 mb-2 animate-fade-in">Hey {userData ? userData.Name : "Developer"}</h1>
      <h1 className="w-auto text-9xl font-bold flex justify-center items-center mt-20 mb-2 animate-fade-in">WELCOME</h1>
      <h1 className="w-auto text-9xl font-bold flex justify-center items-center mt-10 mb-2 animate-fade-in">TO</h1>
      <h1 className="w-auto text-9xl font-bold flex justify-center items-center mt-10 mb-2 animate-fade-in">MYAUTH</h1>
    </div>
  )
}

export default Home
