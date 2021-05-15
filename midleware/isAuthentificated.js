const User = require("../model/User");

const isAuthentificated = async (req, res, next) => {
  console.log("test isAuthentificated  enter");

  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");
    const user = await User.findOne({ token: token }).select(
      "account email _id"
    );
    if (user) {
      req.user = user;
      console.log("test isAuthentificated finish :)");
      return next();
    } else {
      return res.status(400).json({ message: "unauthorized :(" });
    }
  } else {
    return res.status(400).json({ message: "unauthorized :(" });
  }
};
module.exports = isAuthentificated;
