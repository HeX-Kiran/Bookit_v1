const router = require("express").Router();

const{getAllShows,getShowByTheatreID,getShowsByMovieID,updateShow,deleteShow,addShow,getShowByID} = require("../controller/showController")

router.route("/getAllShows").get(getAllShows);
router.route("/getShowById/:showID").get(getShowByID)
router.route("/getShowByTheatreId/:theatreID").get(getShowByTheatreID)
router.route("/getShowByMovieId").post(getShowsByMovieID)
router.route("/addShow").post(addShow)
router.route("/updateShow").put(updateShow);
router.route("/deleteShow").post(deleteShow)

module.exports = router;