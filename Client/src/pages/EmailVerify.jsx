import React,{useContext, useEffect} from 'react'
import myimg from './../assets/image1.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'



const EmailVerify = () => {

  axios.defaults.withCredentials = true;

  const {backendUrl, IsLoggedIn, getUserData, userData } = useContext(AppContext)
  
  const Navigate = useNavigate()

  const InputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < InputRefs.current.length - 1)
    {
      InputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) =>
  {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0)
    {
      InputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = () =>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if(InputRefs.current[index])
      {
        InputRefs.current[index].value = char
      }
    });
  }

  const submitHandler = async(e) => {
    try {
      e.preventDefault()
      const otpArray = InputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + 'api/auth/verify-account', {otp})
      if(data.success)
      {
        toast.dark(data.message)
        getUserData()
        Navigate('/')
      }
      else{
        toast.dark(data.message)
      }
    } catch (error) {
      toast.dark(error.message)
    }
  }

  useEffect(() => {
    userData.AccountVerified && Navigate('/')
  },[userData])

  return (
    <>
      <div className='flex items-center p-4 sm:p-6 sm: px-4 absolute left-4 top-0 text-3xl'>
          <img src={myimg} onClick={() => Navigate('/')}alt="logo" className='ml-1 flex justify-between w-16 h-16 rounded-full cursor-default' />
          <h2 onClick={() => Navigate('/')} className='text-4xl ml-5 cursor-default'>MyAuth</h2>
      </div>

      <form onSubmit={submitHandler} className='absolute top-[200px] left-[580px] w-[40%] h-[500px] border-[1px] rounded-md border-beige'>
        <h1 className='flex justify-center text-6xl mt-9'>Email Verify OTP</h1>
        <p className='flex justify-center mt-5 '>Enter the 6-digit code sent to your email Id</p>
        <div className='flex justify-between md:mt-20 ml-10 mr-10' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type='text' maxLength='1' key={index} required 
            className='w-24 h-24 text-center text-4xl rounded-md  border-beige border'
            ref={e => InputRefs.current[index] = e}
            onInput={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
          {/* <input type='number' className='border rounded-full p-3 text-5xl mt-28'></input> */}
        </div>
        <div className='flex justify-center'>
          <button type="submit" className='border rounded-full pl-32 pr-32 pt-3 pb-3 text-800  hover:bg-gray-50 hover:text-black transition-all text-2xl z-20 mt-20 mr-1'>Verify OTP</button>
        </div>
      </form>


    </>
    
  )
}

export default EmailVerify
