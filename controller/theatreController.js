const e = require("express");
const Theatre = require("../models/theatreModel");

exports.getAllTheatres = async(req,res)=>{
    try {
        const theatres = await Theatre.find().populate('owner');
        if(theatres) res.status(200).json({
            success:true,
            message:"Theatres fetched successfully",
            data:theatres
        })
        else{
            res.json({
                success:false,
                message:"Something went wrong"
            })
        }
    } catch (error) {
        res.json({
            success:false,
            message:"internal error occured",
            data:error.message
        })
    }
}

exports.getTheatreById = async(req,res)=>{
    const {id} = req.params;
    try {
        //add theatre into DB
        const theatre = await Theatre.findOne({_id:id}).populate("owner");
        if(theatre){
            res.status(200).json({
                success:true,
                message:"Theatre fetched successfully",
                data: theatre
            })
        }
        else{
            res.send({
                success:false,
                message:"Theatre doesnt exsist"
            })
        }
        
    } catch (error) {
        res.send({
            success:false,
            message:"Internal error occured",
            data:error.message

        })
    }
    
}

exports.getTheatreByUserID = async(req,res)=>{
    const {userID} = req.params;
    try {
        //get the theatres for the userID
        const theatres = await Theatre.find({owner:userID}).populate("owner");

        //if theatre exsist for that userID then send all the theatre as response
        if(theatres){
            res.status(200).json({
                success:true,
                message:"Theatres fetched successfully",
                data: theatres
            })
        }

        // if thaetre doesnt exist for the userID then send an empty array 
        else{
            res.send({
                success:true,
                message:"Please add atleast one theatre",
                data :[]
            })
        }
        
    } catch (error) {
        res.send({
            success:false,
            message:"Internal error occured",
            data:error.message

        })
    }
    
}

exports.addTheatre = async(req,res)=>{
    const theatreDetails = req.body;
    try {

        //check if theatre already exsist
        const theatreAlreadyExsist = await Theatre.findOne({name:theatreDetails.name});
        if(theatreAlreadyExsist){
            // if theatre already exsist
            res.send({
                success:false,
                message:"Theatre already exsist."
            })
        }
        // if theatre doesnt exsist then add it
        else{
                //add theatre into DB
                const newTheatre = await Theatre.create(theatreDetails);
                res.status(201).json({
                    success:true,
                    message:"Theatre added successfully",
                    data: theatreDetails
                })
        }
        
    } catch (error) {
        res.send({
            success:false,
            message:"Internal error occured",
            data:error.message

        })
    }
   
}


exports.updateTheatre = async(req,res)=>{
    
    const theatreDetails = req.body;
    const id = theatreDetails._id;
    delete theatreDetails._id
    try {
        //add theatre into DB
        const theatre = await Theatre.findOne({_id:id});
        //if theatre exsist in DB
        if(theatre){
            
            const updatedTheatre = await Theatre.findByIdAndUpdate(id,theatreDetails)
            res.status(200).json({
                success:true,
                message:"Theatre updated successfully",
                data: updatedTheatre
            })
        }
        //if theatre doesnt exsist in DB
        else{
            res.send({
                success:false,
                message:"Theatre not found"
            })
        }
        
    } catch (error) {
        res.send({
            success:false,
            message:"Internal error occured",
            data:error.message

        })
    }
   
}


exports.deleteTheatre = async(req,res)=>{
    
    const theatreDetails = req.body;
   
    const id = theatreDetails._id;
   
    
    try {
        //add theatre into DB
        const theatre = await Theatre.findOne({_id:id});
        //if theatre exsist in DB
        if(theatre){
            
            const updatedTheatre = await Theatre.findOneAndDelete({_id:id});
            res.status(200).json({
                success:true,
                message:"Theatre deleted successfully",
                data: updatedTheatre
            })
        }
        //if theatre doesnt exsist in DB
        else{
            res.send({
                success:false,
                message:"Theatre not found"
            })
        }
        
    } catch (error) {
        res.send({
            success:false,
            message:"Internal error occured",
            data:error.message

        })
    }
   
}

exports.checkIfUserHaveTheatre = async(req,res)=>{
    // get the userID from params
    const {userID} = req.params;


    try {
        // check for theatre in theatre model by userID
        const theatreExsist = await Theatre.findOne({owner:userID})

        //if theatre exist for that userID send success response
        if(theatreExsist){
            res.json({
                success:true,
                message:"theatre found",
                data:theatreExsist
            })
        }

        //if not theatre exsist send failure response
        
        else{
            res.json({
                success:false,
                message:"User havent registered any theatre"
            })
        }
    } catch (error) {
        res.json({
            success:false,
            message:"Internal error",
            data:error.message
        })
    }
}