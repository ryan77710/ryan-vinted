const express = require("express");
const router = express.Router();
const User = require("../model/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const isAuthentificated = require("../midleware/isAuthentificated");
const Offer = require("../model/Offer");

const cloudinary = require("cloudinary").v2;

router.post("/user/signup", async (req, res) => {
  console.log("route: user/signup");
  try {
    if (req.fields.username) {
      const find = await User.findOne({ email: req.fields.email });
      if (find) {
        res.status(400).json({ message: "email already use" });
      } else {
        const newAccount = new User({
          email: req.fields.email,
          account: {
            username: req.fields.username,
            phone: req.fields.phone,
          },
        });
        if (req.files.pictureup) {
          const picProfile = req.files.pictureup.path;
          const result = await cloudinary.uploader.upload(picProfile, {
            folder: `vinted/user/picture/${newAccount._id}`,
          });
          newAccount.account.avatar = result;
        }

        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);

        newAccount.token = token;
        newAccount.hash = hash;
        newAccount.salt = salt;
        await newAccount.save();
        console.log("account created");
        res.status(200).json(newAccount);
      }
    } else {
      res.status(400).json({ message: "you forget the username" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  console.log("route: /user/login");
  try {
    const find = await User.findOne({ email: req.fields.email });
    const password = req.fields.password;
    const userSalt = find.salt;
    const hashToCompare = SHA256(password + userSalt).toString(encBase64);

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
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/profile", isAuthentificated, async (req, res) => {
  console.log("route: /user/profile");
  try {
    const myOffers = await Offer.find({ owner: req.user._id });
    const user = await User.findById(req.user._id);
    res.status(200).json({ user: user, myoffers: myOffers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/user/update", isAuthentificated, async (req, res) => {
  console.log("route: /user/update");
  try {
    const description = req.fields.description;
    const picture = req.files.picture;
    const user = await User.findById(req.user._id);
    if (picture) {
      const deletepic = await cloudinary.api.delete_resources_by_prefix(
        `vinted/user/picture/${user._id}`
      );

      const pictureUpload = await cloudinary.uploader.upload(picture.path, {
        folder: `vinted/user/picture/${user._id}`,
      });
      user.account.avatar = pictureUpload;
    }
    if (description) {
      user.account.description = description;
    }

    await user.save();
    res.status(200).json({ message: "photo d'utilisateur mise a jour" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
