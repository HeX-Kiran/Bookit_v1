const router = require("express").Router();
const {addUser} = require("./../controller/registerController")

router.route("/")
      .post(addUser)


module.exports = router

