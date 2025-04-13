import mongoose from "mongoose";
 
async function ConnectDB()
{
    try
    {
        await mongoose.connect(`${process.env.MONGODB_URI}/my-auth`);
        console.log("Database connected Successfully!");
    }
    catch(error)
    {
        console.log("Failed to connect ot Database!, Response >> "+ error)
    }
}

export default ConnectDB;