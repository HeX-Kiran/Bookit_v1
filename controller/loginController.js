const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")

exports.validateUser = async(req,res)=>{
    
    

    try {
        const userDetails = req.body;

        //check if email is present or not
        const validUser = await Users.findOne({email:userDetails.email})
        
        if(validUser){
            
            //get the password from the DB
            const hashedPassword = validUser.password;
            //if present then check verify the password 
            const verifyPassword = await bcrypt.compare(userDetails.password,hashedPassword);
            
            //if password is correct then send a jwt token and a success response
            if(verifyPassword){
                //create a jwt token
                const token = jwt.sign({userId:validUser.id},process.env.JWT_SECRET);
                return res.status(200).json({
                    success:true,
                    message :"Successfully logged in",
                    data:{
                        token
                    }
                })
            }
            
            //else send a invalid password response
            else{
               
                return res.status(200).json({
                    success:false,
                    message:"Incorrect Password",

                })
            }
        }
        //else return an error response
        else{
            
            return res.status(200).json({
                success:false,
                message:"No user found",
            })
        }
        
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Internal server error occured",
            error: error.message
        })
    }
    
}

exports.updateUser = async(req,res)=>{
    const userData = req.body;

    try{

        // if user not present then add user into db
        // we need to hash the password while storing in DB

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password,salt);
        
       

       // get the currentUser details
       const currentUserDetails = await Users.findOne({email:userData.email})
       
       
       //update the currentUserDetails
       const updatedDetails = {
        ...currentUserDetails._doc,
        password:hashedPassword
       }

       

       // update updatedDetails in DB
       const updatedUser = await Users.findByIdAndUpdate(currentUserDetails._id, updatedDetails, {
        returnOriginal: false
      });
      

      return res.status(200).json({
        success:true,
        message:"Password updated successfully",
        data: updatedUser
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

exports.validateAdmin = async(req,res)=>{
    try {
        const userDetails = req.body

        //check if email is present or not
        const validUser = await Users.findOne({email:userDetails.email})
        
        if(validUser){
            
            //get the password from the DB
            const hashedPassword = validUser.password;
            //if present then check verify the password 
            const verifyPassword = await bcrypt.compare(userDetails.password,hashedPassword);
            
         
            if(verifyPassword){
               
                return res.status(200).json({
                    success:true,
                    message :"Successfully logged in",
                    data:hashedPassword
                })
            }
            
            //else send a invalid password response
            else{
               
                return res.status(200).json({
                    success:false,
                    message:"Incorrect admin token",

                })
            }
        }
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Internal server error occured",
            error: error.message
        })
    
    }
}

exports.resetPassword = async(req,res)=>{
    try {
        const{userEmail} = req.body
        let generatedOtp = ''; 
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
        

        //check if user email exsist or not
        const user = await Users.findOne({email:userEmail});

        //if email exsist 
        if(user){
            // generate otp and send otp to user mail

            //generate a random otp
            for (let i = 0; i < 6; i++) { 
                generatedOtp += characters.charAt(Math.floor(Math.random() * characters.length)); 
            }

            const transpoter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:process.env.MAILER_EMAIL,
                    pass:process.env.MAILER_PASSWORD
                }
            })
    
            const mailOptions = {
                from: process.env.MAILER_EMAIL,
                to: userEmail,
                subject: 'Reset password',
                text: 'Text Data',
                html: `
                 <p>Your Bookit password can be reset by copying the otp below. If you did not request a new password, please ignore this email<p>
                 <h1>${generatedOtp}</h1>
                 <br>
                 <p>Regards,<p>
                 <p>Bookit Admin</p>
                 
                `,
                // attachments: [
                //   {
                //     // filename: 'image.png',
                //     path: 'http://localhost:3000/theatre>'
                //   }
                // ]
              };
    
              transpoter.sendMail(mailOptions, function(error, info){
                if (error) {
                     res.status(404).json({
                        success:false,
                        message:"Internal server error occured",
                        error: error.message
                    })
                } else {
                  res.send({
                    success:true,
                    message:"Otp send successfully",
                    data:generatedOtp
                  })
                }
            });
        }

        // if user doesnot exsist then failure response
        else{
            res.send({
                success:false,
                message:"Email is not registered"
            })
        }
       
        
          
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Internal server error occured",
            error: error.message
        })
    }
}