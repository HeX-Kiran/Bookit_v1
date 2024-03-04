const mongoose = require("mongoose");


const movieSchema = new mongoose.Schema({
    title :{
        type:String,
        required :[true,"Movie title is mandatory"]
    },
    description:{
        type:String,
        required:[true,"Description is mandatory"]
    },
    duration:{
        type:Number,
        required:[true,"Duration is mandatory"]
    },
    genre:{
        type:String,
        required:[true,"Genre is mandatory"]
    },
    language:{
        type:String,
        required:[true,"Langauge is mandatory"]
    },
    releaseDate:{
        type:Date,
        required:[true,"Date is mandatory"]
    },
    poster:{
        type:String,
        required:[true,"Poster url is mandatory"]
    }
});

const Movie = new mongoose.model("movies",movieSchema);

module.exports = Movie