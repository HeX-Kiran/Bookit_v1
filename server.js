const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

app.listen(process.env.PORT,()=>console.log("Server running at port",process.env.PORT));

mongoose.connect(process.env.MONGOURL).then(()=>console.log("DB Connected")).catch(e=>console.log(e));
