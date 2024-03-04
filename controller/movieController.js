const Movie = require("../models/movieModel");


exports.addMovie = async(req,res)=>{
    const movieDetails = req.body;
    try {

        //check if movie already exsist
        const movieAlreadyExsist = await Movie.findOne({title:movieDetails.title});
        if(movieAlreadyExsist){
            // if movie already exsist
            res.send({
                success:false,
                message:"Movie already exsist"
            })
        }
        // if movie doesnt exsist then add it
        else{
                //add movie into DB
                const newMovie = await Movie.create(movieDetails);
                res.status(201).json({
                    success:true,
                    message:"Movie added successfully",
                    data: movieDetails
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

exports.getAllMovies = async(req,res)=>{
    
    try {
        //add movie into DB
        const movies = await Movie.find();
        res.status(200).json({
            success:true,
            message:"Movies fetched successfully",
            data: movies
        })
    } catch (error) {
        res.send({
            success:false,
            message:"Internal error occured",
            data:error.message

        })
    }
   
}

exports.getMovieById = async(req,res)=>{
    const {id} = req.params;
    try {
        //add movie into DB
        const movie = await Movie.findOne({_id:id});
        if(movie){
            res.status(200).json({
                success:true,
                message:"Movie fetched successfully",
                data: movie
            })
        }
        else{
            res.send({
                success:false,
                message:"Movie doesnt exsist"
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

exports.updateMovie = async(req,res)=>{
    
    const movieDetails = req.body;
    const id = movieDetails._id;
    delete movieDetails._id
    try {
        //add movie into DB
        const movie = await Movie.findOne({_id:id});
        //if movie exsist in DB
        if(movie){
            
            const updatedMovie = await Movie.findByIdAndUpdate(id,movieDetails)
            res.status(200).json({
                success:true,
                message:"Movie updated successfully",
                data: updatedMovie
            })
        }
        //if movie doesnt exsist in DB
        else{
            res.send({
                success:false,
                message:"Movie not found"
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


exports.deleteMovie = async(req,res)=>{
    
    const movieDetails = req.body;
   
    const id = movieDetails._id;
    
    try {
        //add movie into DB
        const movie = await Movie.findOne({_id:id});
        //if movie exsist in DB
        if(movie){
            
            const updatedMovie = await Movie.findOneAndDelete({_id:id});
            res.status(200).json({
                success:true,
                message:"Movie deleted successfully",
                data: updatedMovie
            })
        }
        //if movie doesnt exsist in DB
        else{
            res.send({
                success:false,
                message:"Movie not found"
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