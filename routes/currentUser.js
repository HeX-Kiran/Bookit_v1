const router = require("express").Router();
const User = require("../models/userModel");
const {authMiddleware} = require("../middlewares/authMiddleware");
const {getCurrentUser} = require("../controller/currentUserController")

router.route("/")
        .get(authMiddleware,getCurrentUser)

module.exports = router