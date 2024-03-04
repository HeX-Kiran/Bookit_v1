const express = require("express");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const currentUserRoute = require("./routes/currentUser");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoute")
const app = express();
app.use(express.json());
app.use(express.static('build'))
app.use("/api/user/register",registerRoute);
app.use("/api/user/login",loginRoute);
app.use("/api/user/currentUser",currentUserRoute);
app.use("/api/movie",movieRouter);
app.use("/api/theatre",theatreRouter);
app.use("/api/show",showRouter);
app.use("/api/booking",bookingRouter)




module.exports = app;