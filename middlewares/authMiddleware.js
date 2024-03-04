const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


exports.authMiddleware = (req,res,next)=>{
    
    try {
        
        //get the token from the header
       
        
        const token = req.headers.authorization.split(" ")[1];
        //decrypt the token
        
       
        const userId = jwt.verify(token,process.env.JWT_SECRET);
        
        
        //send the userId to the server by adding the userId in the req.body
        req.body.userID = userId;
        next();
    } catch (error) {
        // if any error occur that means user is not authorized
        return res.json({
            success:false,
            message:"User is not authorized"
        })
    }
}