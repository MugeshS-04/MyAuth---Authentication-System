import userModel from "../models/userModel.js";

export const getUserData = async(req, res) =>{
    const {userID} = req.body
    const user = await userModel.findById(userID)

    try{
        if(!user)
        {
            return res.json({success: false, message: "No user Found"})            
        }

        return res.json({success: true, 
            userDate: {
                Name: user.name,
                email: user.email,
                isAuthenticated: user.isAuthenticated
            }
        })
    }
    catch(error)
    {
        return res.json({success: false, message: "Failed to Retrieve!"})
    }
}

export default getUserData;