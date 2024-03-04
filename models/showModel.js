const mongoose = require("mongoose");


const showSchema = mongoose.Schema({
    name :{
        type :String,
        required:[true,"Show name is mandatory"]
    },
    date:{
        type:Date,
        required:[true,"Date is mandatory"]
    },
    time:{
        type:String,
        required:[true,"Time is mandatory"]
    },
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"movies",
        required:[true,"movie is mandatory"]
    },
    ticketPrice:{
        type:Number,
        required:[true,"Ticket price is mandatory"]
    },
    totalSeats:{
        type:Number,
        required:[true,"Total seats are mandatory"]
    },
    bookedSeats:{
        type:Array,
        required:[true,"Booked seats numbers are mandatory"]
    },
    theatre:{
        type:mongoose.Types.ObjectId,
        ref:"theatre",
        required:[true,"TheatreID is mandatory"]
    }
});

const Show = mongoose.model("shows",showSchema);

module.exports = Show