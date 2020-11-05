const express = require("express");
const router = express.Router();
const User = require("../model/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/user/signup", async (req, res) => {
  console.log("route: user/signup");
  try {
    if (req.fields.username) {
      const find = await User.findOne({ email: req.fields.email });
      if (find) {
        res.status(400).json({ message: "email already use" });
      } else {
        const account = new User({
          email: req.fields.email,
          account: {
            username: req.fields.username,
            phone: req.fields.phone,
          },
        });
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);
        account.token = token;
        account.hash = hash;
        account.salt = salt;
        await account.save();
        console.log("account created");
      }
    } else {
      res.status(400).json({ message: "you forget the username" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/user/login", async (req, res) => {
  console.log("route: /user/login");
  try {
    const find = await User.findOne({ email: req.fields.email });
    const password = req.fields.password;
    const userSalt = find.salt;
    const hashToCompare = SHA256(password + userSalt).toString(encBase64);
    //console.log(hashToCompare);
    //console.log("--------------------------------------------------------");
    //console.log();
    if (find.hash === hashToCompare) {
      const back = {
        id: find.id,
        token: find.token,
        account: {
          username: find.account.username,
          phone: find.account.phone,
        },
      };
      res.status(200).json(back);
    } else {
      res.status(400).json({ message: "bad password" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
