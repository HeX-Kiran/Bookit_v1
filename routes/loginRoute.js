const router = require("express").Router();
const {validateUser,validateAdmin,resetPassword,updateUser} = require("../controller/loginController")


router.route("/")
       .post(validateUser)
router.route("/reset-password").post(resetPassword);
router.route("/update-password").post(updateUser)
router.route("/admin").post(validateAdmin)


module.exports = router