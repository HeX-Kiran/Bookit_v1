const router = require("express").Router();
const {makePayment,bookShow,checkSeatAvailable,getTicketsByUserid} = require("../controller/bookingController")

router.route("/make-payment").post(makePayment);

router.route("/book-show").post(bookShow);
router.route("/book-show/check-seat-available").post(checkSeatAvailable);

router.route("/get-booking-by-userid/:id").get(getTicketsByUserid)

module.exports = router