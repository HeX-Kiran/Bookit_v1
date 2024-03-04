const mongoose = require("mongoose");


const theatreSchema = mongoose.Schema({
    name :{
        type:String,
        required :[true,"Theatre name is mandatory"]
    },
    address:{
        type:String,
        required:[true,"Theatre Address is mandatory"]
    },
    location:{
        type:String,
        required:[true,"Location is mandatory"]
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:[true,"Owner is mandatory"]
    },
    isActive :{
        type:String,
        default:"pending",
        
    }
})

const Theatre = mongoose.model("theatre",theatreSchema);

module.exports = Theatre;