import { createContext, useState } from "react";
import { toast } from 'react-toastify'
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = (props) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [userData, setUserData] = useState(false);

        const getUserData = async () => {
                try {
                        const {data} = await axios.get(backendUrl + 'api/user/get-data')
                        if(data.success)
                        {
                                setUserData(data.userData)
                        }
                        else{
                                toast.error("Error Occured!"+ data.message)
                        }
                } catch (error) {
                        
                        toast.error("Error Occured!")
                }
        }
        const value = {
            backendUrl,
            isLoggedIn, setIsLoggedIn,
            userData, setUserData,
            getUserData
        }

        return(
                <AppContext.Provider value={value}>
                        {props.children}
                </AppContext.Provider>
        )
}

