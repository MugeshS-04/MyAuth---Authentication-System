import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import axios from "axios";
import { Navigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = (props) => {
        axios.defaults.withCredentials = true;

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [userData, setUserData] = useState(false);

        const getauthstatus = async () => {
                try {
                        const {data} = await axios.get(backendUrl + 'api/auth/is-auth')
                        if(data.success)
                        {
                                setIsLoggedIn(true);
                                getUserData()
                        }
                } catch (error) {
                        
                        toast.dark("Error")
                }
        }

        const getUserData = async () => {
                
                axios.defaults.withCredentials = true;
                
                try {
                        const {data} = await axios.get(backendUrl + 'api/user/get-data')
                        if(data.success)
                        {
                                setUserData(data.userData)
                                setIsLoggedIn(true);
                        }
                        else{
                                toast.error("Error Occured!"+ data.message)
                        }
                } catch (error) {
                        
                        toast.error("Error Occured!")
                }
        }


        useEffect(() => {
                getauthstatus()
        },[])

        const value = {
            backendUrl,
            isLoggedIn, setIsLoggedIn,
            userData, setUserData,
            getUserData,
        }

        return(
                <AppContext.Provider value={value}>
                        {props.children}
                </AppContext.Provider>
        )
}

