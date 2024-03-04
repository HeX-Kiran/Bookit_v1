const router = require("express").Router();
const{addMovie,getAllMovies,updateMovie,deleteMovie,getMovieById} = require("../controller/movieController");

router.route("/addMovie")
       .post(addMovie);

router.route("/getAllMovies").get(getAllMovies);
router.route("/getMovieById/:id").get(getMovieById);

router.route("/updateMovie").put(updateMovie);


router.route("/deleteMovie").post(deleteMovie)


module.exports = router