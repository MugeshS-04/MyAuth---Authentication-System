import express from 'express'
import { login, logout, register, sendVerifyOTP, verifyEmail, isAuthenticated, sentresetotp, resetpassword } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', userAuth, sendVerifyOTP)
authRouter.post('/verify-account',userAuth, verifyEmail)
authRouter.post('/is-auth',userAuth, isAuthenticated)
authRouter.post('/send-reset-otp', sentresetotp)
authRouter.post('/reset-password', resetpassword)

export default authRouter

