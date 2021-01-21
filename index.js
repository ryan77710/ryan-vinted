const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

app = express();
app.use(formidable());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const userroute = require("./route/user");
app.use(userroute);

const offeroute = require("./route/offer");
app.use(offeroute);

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});
app.listen(process.env.PORT, () => {
  console.log("server has started");
});

// app.listen(3100, () => {
//   console.log("server has started");
// });
///////
