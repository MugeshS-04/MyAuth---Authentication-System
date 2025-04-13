import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js'


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
            text: `Welcome to MyAuth. Your Account has been created successfully!`
        }

        await transporter.sendMail(mailOptions)

        return res.json({success: true})
    }
    catch(error)
    {
        return res.json({success: false, message: message.error})
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
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
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
        const {userId, otp} = req.body;

        if(!userId || !otp)
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
         
    }
}