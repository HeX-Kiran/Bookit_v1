const Users = require("../models/userModel");

exports.getCurrentUser = async(req,res)=>{


    //this req has a userID because it is passed throgh auth middleware
    const userID = req.body.userID.userId;
    
    try {
        //get the details of the userID from db
        const user = await Users.findOne({_id:userID});
        
        //if user not found then send a error response
        if(!user){
            res.status(200).json({
                success:false,
                message:"User not found"
            })
        }

        //if user found then send the user data
        return res.status(200).json({
            success:true,
            message:"User found",
            data: user
    })
    } catch (error) {
        return res.json({
            success:false,
            message:"Internal server error occured"
        })
    }
    
}