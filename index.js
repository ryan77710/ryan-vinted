const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
require("dotenv").config();

app = express();
app.use(formidable());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const userroute = require("./route/user");
app.use(userroute);

const offeroute = require("./route/offer");
app.use(offeroute);

app.listen(process.env.PORT, () => {
  console.log("server has started");
});
///////
