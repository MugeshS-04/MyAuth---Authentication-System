import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token)
    {
        return res.json({success: false, message: 'Not Authorized. Login Again'})
    }
    try
    {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id)
        {
            req.body = req.body || {};
            req.body.userID = tokenDecode.id
        }
        else{
             return res.json({success: false, message: "Not Authorized. Login Again"})
        }

        next();
    }
    catch(error)
    {
        return res.json({success: false, message:  "Invalid Token"})
    }
}

export default userAuth;