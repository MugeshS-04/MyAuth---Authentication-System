import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js'
import { email_verify_otp, Pass_Reset_Email, Welcome_Email } from '../config/Emailtemplates.js';


export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password)
    {
        return res.json({success: false, message: 'Missing Details'})
    }
    
    try
    {
        const userExisting = await userModel.findOne({email})
        
        if(userExisting)
        {
            return res.json({success: false, message: 'User Already Exists!'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({name, email, password: hashedPassword})
        await user.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: email,
            subject: 'Welcome to MyAuth!',
            html: Welcome_Email
        }

        await transporter.sendMail(mailOptions)

        return res.json({success: true})
    }
    catch(error)
    {
        return res.json({success: false, message: error})
    }
}


export const login = async (req, res) => {
    const{email, password} = req.body;

    if(!email || !password)
    {
        return res.json({success: false, message: 'Some Feild is missing!'})
    }
    
    try{
        const user = await userModel.findOne({email});
        if(!user)
        {
            return res.json({success: false, message: "The User doesn't exist"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch)
        {
            return res.json({success: false, message: "Invalid Password"})           
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({success: true})
        
        
    }
    catch(error)
    {
        return res.json({success: false, message: error})
    }

}

export const logout = async(req, res) =>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
        })

        return res.json({success: true, message: 'Logged Out successfully'})
    }
    catch(error)
    {
        return res.json({success: false, message: error})           
    }
}

export const sendVerifyOTP = async (req, res) => {
    try{
        const {userID} = req.body;

        const user = await userModel.findById(userID);
        
        if(user.isAccountVerified)
            {
                return res.json({success: false, message: "Already verified!"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save()

        const mailOption = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            html: email_verify_otp.replace("RESET MY PASSWORD", otp)
        }

        await transporter.sendMail(mailOption)

        return res.json({success: true, message: "OTP sent successfully"})

    }
    catch(error){
        return res.json({success: false, message: "Failed to send OTP"})
    }
}


export const verifyEmail = async (req, res) => {
    try
    {
        const {userID, otp} = req.body;
        const user = await userModel.findById(userID);

        if(!userID || !otp)
        {
            return res.json({success: false, message: 'Missing Details'})
        }
        if(user.verifyOtp === '' || user.verifyOtp != otp)
        {
            return res.json({success: false, message: 'Invalid OTP'})
            
        }
        if(user.verifyOtpExpireAt < Date.now())
        {
           return res.json({success: false, message: 'OTP Expired'})
                
        }

        user.isAccountVerified = true
        user.verifyOtp = ''
        user.verifyOtpExpireAt = 0

        await user.save()

        return res.json({success: true, message: "Email Verified Successfully!"})
    }
    catch(error)
    {
        return res.json({success: false, message: "Failed to verify!"}) 
    }
}


export const isAuthenticated = async (req, res) => {
    try
    {
        return res.json({success: true, message: "Authenticated Successfully!"})
    }
    catch(error)
    {
        return res.json({success: false, message: "Not Authenticated"})
    }
}

export const sentresetotp = async (req, res) => {
    
    const {email} = req.body;

    if(!email)
    {
        return res.json({success: false, message: "Missing email"})
    }
     try{
        const user = await userModel.findOne({email});
    
        if(!user)
        {
           return res.json({success: false, message: "User not Found"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save()

        const mailOption = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            html: Pass_Reset_Email.replace("RESET MY PASSWORD", otp)
        }

        await transporter.sendMail(mailOption)

        return res.json({success: true, message: "OTP sent successfully"})

    }
    catch(error){
        return res.json({success: false, message: "Failed to send OTP"})
    }
}



export const resetpassword = async (req, res) => {
    
    const {email, otp, newpassword} = req.body;

    if(!email || !otp || !newpassword)
    {
        return res.json({success: false, message: "Missing Details"})
    }
     try{
        const user = await userModel.findOne({email});
    
        if(!user)
        {
           return res.json({success: false, message: "User not Found"})
        }
        if(user.resetOtp === '' || user.resetOtp != otp)
        {
            return res.json({success: false, message: 'Invalid OTP'})
                
        }
        if(user.resetOtpExpireAt < Date.now())
        {
           return res.json({success: false, message: 'OTP Expired'})
                    
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10)

        user.password = hashedPassword
        user.resetOtp === ''
        user.resetOtpExpireAt = 0


        await user.save()

        return res.json({success: true, message: "Password changed successfully!"})

    }
    catch(error){
        return res.json({success: false, message: "Failed to send OTP"})
    }
}

