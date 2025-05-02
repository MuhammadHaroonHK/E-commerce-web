const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect= async (req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token=req.headers.authorization.split(" ")[1];
            const decode=jwt.verify(token, process.env.SECRET_KEY);

            req.user= await User.findById(decode.user.id).select("-password"); //excluded password
            next();
        } catch (error) {
            console.log("Token verification failed", error);
            res.status(401).json({msg:"Not autorized, token failed"})
        }
    } else{
        res.status(401).json({msg:"no token provided"})
    }
}

module.exports={protect}