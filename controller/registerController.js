const Users = require("../models/userModel");
const bcrypt = require("bcrypt")

exports.addUser = async(req,res)=>{
    const userData = req.body;

    try{
        const checkUserPresent = await Users.findOne({email:userData.email})
       
        // check if email already exsist
        //if present then send response already exsist
        if(checkUserPresent){
            return res.status(200).json({
                success:false,
                message:"User already exsist"
            })
        }
        // if user not present then add user into db
        // we need to hash the password while storing in DB

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password,salt);

        //now add the user with the hashed password
        const newUser = await Users.create({...userData,password:hashedPassword})
        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            data :{
                newUser
            }
        })
    }
    catch(e){
        return res.status(404).json({
            success:false,
            message :"Internal error occured",
            error : e.message
        })
    }
    
}

