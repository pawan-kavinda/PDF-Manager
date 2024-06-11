const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const userRoute = require("./routes/auth_routes");
const pdfRoute = require("./routes/home_routes");
const dotenv = require("dotenv");
const path = require("path");

// -----------middlewares----------

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"))
dbConnection();

// ---------------Routes-----------

app.use("/authentication", userRoute);
app.use("/", pdfRoute);




// ---------------------------------

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Node server is running on port " + port);
});
