const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : [true,"Name is a mandatory field"],
       
    },

    email :{
        type:String,
        required:[true,"Email is mandatory"],
        unique:true
    },
    password:{
        type : String,
        required:[true,"Email is mandatory"],
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const Users = mongoose.model("users",userSchema);

module.exports = Users;