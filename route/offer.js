const express = require("express");
const router = express.Router();
const Offer = require("../model/Offer");
const User = require("../model/User");
const isAuthentificated = require("../midleware/isAuthentificated");
const { route } = require("./user");
const { json } = require("express");

const cloudinary = require("cloudinary").v2;

router.post("/offer/publish", isAuthentificated, async (req, res) => {
  console.log("route :/offer/publish");
  try {
    const {
      title,
      description,
      price,
      brand,
      size,
      condition,
      color,
      city,
    } = req.fields;
    const picture = req.files.picture.path;

    const newOffer = new Offer({
      product_name: title,
      product_description: description,
      product_price: price,
      product_details: [
        {
          MARQUE: brand,
        },
        {
          TAILLE: size,
        },
        {
          ETAT: condition,
        },
        {
          COULEUR: color,
        },
        {
          EMPLACEMENT: city,
        },
      ],
      //   owner: req.user._id,
      owner: req.user,
    });
    const result = await cloudinary.uploader.upload(picture, {
      folder: `vinted/offer/${newOffer._id}`,
    });
    newOffer.product_image = result;
    await newOffer.save();

    res.status(200).json(newOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/offer/update", isAuthentificated, async (req, res) => {
  console.log("route : /offer/update");
  try {
    const offer = await Offer.findById(req.fields.id);
    const {
      title,
      description,
      price,
      brand,
      size,
      condition,
      color,
      city,
    } = req.fields;

    offer.product_name = title;
    offer.product_description = description;
    offer.product_price = price;
    const picture = req.files.picture.path;
    offer.product_details[0].MARQUE = brand;
    offer.product_details[1].TAILLE = size;
    offer.product_details[2].ETAT = condition;
    offer.product_details[3].COULEUR = color;
    offer.product_details[4].EMPLACEMENT = city;

    const result = await cloudinary.uploader.upload(picture, {
      folder: `vinted/offer/${offer._id}`,
    });
    offer.product_image = result.secure_url;
    await offer.save();
    res.status(200).json({ message: "offer updated :)" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/offer/delete", isAuthentificated, async (req, res) => {
  console.log("route: /offer/delete");
  try {
    const find = await Offer.findById(req.fields.id);

    const deletepic = await cloudinary.api.delete_resources_by_prefix(
      `vinted/offer/${find._id}`
    );
    console.log("cloud 1");
    const deletefold = await cloudinary.api.delete_folder(
      `vinted/offer/${find._id}`
    );
    console.log("cloud 2");
    await find.deleteOne();
    res.status(200).json({ message: "offer deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ici
// router.get("/offers", isAuthentificated, async (req, res) => {
router.get("/offers", async (req, res) => {
  console.log("route: /offers");
  try {
    let filters = {};

    if (req.query.title) {
      filters.product_name = new RegExp(req.query.title, "i");
    }

    if (req.query.priceMin) {
      filters.product_price = {
        $gte: req.query.priceMin,
      };
    }

    if (req.query.priceMax) {
      if (filters.product_price) {
        filters.product_price.$lte = req.query.priceMax;
      } else {
        filters.product_price = {
          $lte: req.query.priceMax,
        };
      }
    }

    let sort = {};

    if (req.query.sort === "price-asc") {
      sort = { product_price: 1 };
    } else if (req.query.sort === "price-desc") {
      sort = { product_price: -1 };
    }

    let limit = Number(req.query.limit);

    let page;
    if (Number(req.query.page) < 1) {
      page = 1;
    } else {
      page = Number(req.query.page);
    }

    const offers = await Offer.find(filters)
      .populate({
        path: "owner",
        select: "account",
      })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Offer.countDocuments(filters);

    res.status(200).json({
      count: count,
      offers: offers,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/offer/:id", async (req, res) => {
  console.log("route: /offer/:id ");
  try {
    const id = req.params.id;
    const offer = await Offer.findById(id)
      .populate({
        path: "owner",
        select: "account avatar",
      })
      .populate({
        path: "account",
        select: " avatar",
      });
    res.status(200).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
