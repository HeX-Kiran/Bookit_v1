const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    show:{
        type:mongoose.Types.ObjectId,
        ref:"shows",
        required:[true,"show id is mandatory"]
    },
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"movies",
        required:[true,"movie id is mandatory"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:[true,"User id is mandatory"]
    },
    transactionId :{
        type:String,
        required:[true,"Transaction id is mandatory"]
    },
    date:{
        type:Date,
        required:[true,"Date is mandatory"],
    },
    time:{
        type:String,
        required:[true,"Time is mandatory"],
    },
    screen:{
        type:String,
        required:[true,"screen name is mandatory"],
    },
    theatre:{
        type:String,
        required:[true,"theatre name is mandatory"],
    },
    bookedSeats:{
        type:Array,
        required:[true,"booked seat are mandatory"]
    }
    
},{timestamps: true})


const Booking = mongoose.model("bookings",bookingSchema);

module.exports = Booking;
