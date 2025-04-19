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

                setState("Change Password")
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
              <img src={myimg} onClick={() => Navigate('/')}alt="logo" className='ml-1 flex justify-between w-16 h-16 rounded-full cursor-default' />
              <h2 onClick={() => Navigate('/')} className='text-4xl ml-5 cursor-default'>MyAuth</h2>
          </div>

        <form onSubmit={submitHandler} className='absolute top-[200px] left-[580px] w-[40%] h-[500px] border-[1px] rounded-md border-beige'>
            
                {state === "Sent OTP" ? (
                    <>
                        <h1 className='flex justify-center text-6xl mt-9'>Reset Password</h1>
                        <p className='flex justify-center mt-7 '>{state === "Sent OTP" ? "Enter your email to receive the OTP" : "Enter your new password"}</p>
                        <div className='flex justify-center'>
                        <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder="email"className='w-3/4 h-20 p-8 text-3xl border border-beige rounded-full mt-20 '></input>
                        </div>
                    </>  
                ) :  state === "Verify OTP" ?
                (
                    <>
                        <h1 className='flex justify-center text-6xl mt-9'>Reset Password OTP</h1>
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
                        </div>                   
                    </>
                ) :
                (
                    <>
                        <h1 className='flex justify-center text-6xl mt-9'>Reset Password</h1>
                        <p className='flex justify-center mt-7 '>Enter your new password</p>
                        <div className='flex justify-center'>
                        <input onChange={(e) => setPassword(e.target.value)} type='text' placeholder="password"className='w-3/4 h-20 p-8 text-3xl border border-beige rounded-full mt-6'></input>
                        </div>
                        <div className='flex justify-center'>
                        <input onChange={(e) => setConPassword(e.target.value)} type='text' placeholder="Confirm password"className='w-3/4 h-20 p-8 text-3xl border border-beige rounded-full mt-6 mb-0'></input>
                        </div>
                    </>
                )}
                
            <div className='flex justify-center'>
                <button type="submit" className='border rounded-full p-5 text-800  hover:bg-gray-50 hover:text-black transition-all text-2xl mt-14'>{state}</button>
            </div>
      </form>  
    </>
  )
}

export default ResetPassword
