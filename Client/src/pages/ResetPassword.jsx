import React,{useState, useEffect, useContext} from 'react'
import myimg from './../assets/image1.png'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const Navigate = useNavigate()

    const {backendUrl, getUserData} = useContext(AppContext)
    

    const [email, setEmail] = useState('')
    const [newpassword, setPassword] = useState('')
    const [conpassword, setConPassword] = useState('')
    const [otp, setOTP] = useState('')
    const [state, setState] = useState('Sent OTP')
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

        axios.defaults.withCredentials = true;

        try {

            e.preventDefault();

            // axios.defaults.withCredentials = true;

            if(state === "Sent OTP")
            {
                const {data} = await axios.post(backendUrl + 'api/auth/send-reset-otp', {email})

                if(data.success)
                {
                    toast.dark(data.message)
                    setState("Verify OTP")
                }
                else{
                    toast.dark(data.message)
                }
            }
            else if(state === "Verify OTP"){

                const otpArray = InputRefs.current.map(e => e.value)

                setOTP(otpArray.join(""))

                setState("Change")
            }
            else{
                
                if(newpassword === conpassword)
                {
                    const {data} = await axios.post(backendUrl + "api/auth/reset-password" , {email, newpassword, otp})
    
                    if(data.success)
                        {
                            Navigate('/login')
                            toast.dark(data.message)
                        }
                        else{
                            toast.dark(data.message)
                        }
                }
                else
                {
                    toast.dark("Password Mismatching")
                }
            }

            
        } catch (error) {
            toast.dark(error.message)
        }
    }

  return (
    <>
          <div className='flex items-center p-4 sm:p-6 sm: px-4 absolute left-4 top-0 text-3xl'>
              <img onClick={() => Navigate('/')} src={myimg} alt="logo" className='ml-0 md:ml-5 flex justify-between w-16 h-16 md:w-16 md:h-16 rounded-full' />
              <h2 onClick={() => Navigate('/')} className='ml-3 text-[26px] md:text-4xl md:ml-5 cursor-default'>MyAuth</h2>
          </div>

        <form onSubmit={submitHandler} className='flex justify-self-center flex-col text-1xl mt-40 md:p-10 md:mt-60 md:h-full md:w-1/3 md:border-[1px] md:rounded-md border-beige'>
            
                {state === "Sent OTP" ? (
                    <>
                        <h1 className="md:flex md:justify-center text-4xl mt-10 font-bold md:text-[350%] p-5 md:mt-2">Reset Password</h1>
                        <p className="text-1xl mt-7 flex justify-center">{state === "Sent OTP" ? "Enter your email to receive the OTP" : "Enter your new password"}</p>
                        <div className='flex justify-center'>
                        <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder="email"className='mb-8 md:w-[78%] mt-7 h-12 text-xl pl-4 md:mb-10 border border-beige rounded-full'></input>
                        </div>
                    </>  
                ) :  state === "Verify OTP" ?
                (
                    <>
                        <h1 className="ml-4 md:flex md:justify-center text-4xl mt-10 font-bold md:text-[280%] md:mt-2">Reset Password</h1>
                        <p className="text-1xl mt-7 flex justify-center">Enter the 6-digit code sent to your email Id</p>
                        <div className='flex justify-evenly mt-5 md:mt-2' onPaste={handlePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input type='text' maxLength='1' key={index} required 
                            className='w-12 h-[60px] mb-10 md:flex md:justify-between md:w-[12%] md:mt-7 md:mb-10 text-center md:text-2xl rounded-md  border-beige border'
                            ref={e => InputRefs.current[index] = e}
                            onInput={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                        </div>                   
                    </>
                ) :
                (
                    <>
                        <h1 className="flex justify-center text-4xl mt-10 font-bold md:text-[280%] md:mt-2">Reset Password</h1>
                        <p className="md:text-xl text-center mt-6 mb-6">Enter your new password</p>
                        <div className='flex justify-center mb-5'>
                        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder="password"className='w-full h-16 p-5 text-[100%] border border-beige rounded-full'></input>
                        </div>
                        <div className='flex justify-center mb-5'>
                        <input onChange={(e) => setConPassword(e.target.value)} type='password' placeholder="Confirm password"className='w-full h-16 p-5 md:mb- text-[100%] border border-beige rounded-full'></input>
                        </div>
                    </>
                )}
                
            <div className='flex justify-center '>
                <button type="submit" className='border rounded-full p-5 text-800  hover:bg-gray-50 hover:text-black transition-all md:text-2xl'>{state}</button>
            </div>
      </form>  
    </>
  )
}

export default ResetPassword
