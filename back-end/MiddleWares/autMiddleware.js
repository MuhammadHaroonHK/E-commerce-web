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
};

//check role, only admin can create product
const admin=(req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next()
    } else{
        res.status(403).json({msg:"Not authorize, Only admin can create product"})
    }
}

module.exports={protect, admin}