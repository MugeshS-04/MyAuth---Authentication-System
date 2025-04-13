import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token)
    {
        return res.json({success: false, message: 'Not Authorized. Login Again'})
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    try
    {
        if(tokenDecode.id)
        {
            req.body.userID = tokenDecode.id
        }
        else{
             return res.json({success: false, message: "Not Authorized. Login Again"})
        }

        next();
    }
    catch(error)
    {
        return res.json({success: false, message:  "Token Invalid or Expired"})
    }
}

export default userAuth;