const Booking = require("../models/BookingModel");
const Show = require("../models/showModel");

require("dotenv").config();
const Stripe = require("stripe")(process.env.STRIPE_KEY);




exports.makePayment = async(req,res)=>{
    try {
        const{token,amount} = req.body;

        const paymentIntent = await Stripe.paymentIntents.create({
            amount,
            currency: 'INR',
        })

        const transactionId = paymentIntent.client_secret;

        res.send({
            success:true,
            message:"Payment successfull",
            data:transactionId
        })

    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
}

exports.bookShow = async(req,res)=>{
    try {
        const {showID,userID,bookedSeats,transactionId,movieID,date,time,screen,theatre} = req.body;

        //check if transaction ID already exsist or not
        const checkTransactionIdAlreadyExsist = await Booking.findOne({transactionId});

        if(checkTransactionIdAlreadyExsist){
            res.send({
                success:false,
                message:"Transaction id already exsist"
            })
        }

        else{
            const tickets = await Booking.create({show:showID,user:userID,transactionId,bookedSeats,movie:movieID,date,time,theatre,screen});
            res.status(201).json({
                success:true,
                message:"Show booked successfully",
            })
        }
        
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
}

exports.checkSeatAvailable = async(req,res)=>{
    try {
        
        const {seats,showID} = req.body;
    
        const show = await Show.findOne({_id:showID});
        
        const isFilled = seats.some(newSeats=>{
          
            return show.bookedSeats.some(bookedSeat=> {
                
                return newSeats === bookedSeat})
        })

        if(isFilled){
            res.send({
                success:false,
                message:"Seats already booked.Please refresh and try again"
            })

        }

        else{
            res.send({
                success:true,
                message:"Seats are available"
            })
        }

    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
}


exports.getTicketsByUserid=async(req,res)=>{
    try {
        const {id} = req.params;
       
        const tickets = await Booking.find({user:id});

        res.send({
            success:true,
            message:"Tickets fetched successfully",
            data:tickets
        })

    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
}