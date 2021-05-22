const express = require("express");
const router = express.Router();
const Offer = require("../model/Offer");
const User = require("../model/User");
const isAuthentificated = require("../midleware/isAuthentificated");
const { route } = require("./user");
const { json } = require("express");

const cloudinary = require("cloudinary").v2;

router.post("/offer/my-offers", isAuthentificated, async (req, res) => {
  console.log("road : /offer/my-offers");
  try {
    const id = req.user.id;
    const Offers = await Offer.find({ owner: id }).populate({
      path: "owner",
      select: "account",
    });
    res.status(200).json(Offers);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
});

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
      owner: req.user,
    });
    const fileKeys = Object.keys(req.files);

    for (let i = 0; i < fileKeys.length; i++) {
      if (i === 0) {
        const picture = req.files[fileKeys[i]].path;
        const result = await cloudinary.uploader.upload(picture, {
          folder: `vinted/offer/${newOffer._id}`,
        });
        newOffer.product_image = result;
        newOffer.product_picture.push(result);
      } else {
        const picture = req.files[fileKeys[i]].path;
        const result = await cloudinary.uploader.upload(picture, {
          folder: `vinted/offer/${newOffer._id}`,
        });
        newOffer.product_picture.push(result);
      }
    }
    await newOffer.save();
    res.status(200).json(newOffer);
  } catch (error) {
    console.log(error);
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

    if (String(offer.owner) === String(req.user._id)) {
      offer.product_name = title;
      offer.product_description = description;
      offer.product_price = price;
      offer.product_details[0].MARQUE = brand;
      offer.product_details[1].TAILLE = size;
      offer.product_details[2].ETAT = condition;
      offer.product_details[3].COULEUR = color;
      offer.product_details[4].EMPLACEMENT = city;
      offer.markModified("product_details");
      await offer.save();
      res.status(200).json(offer);
    } else {
      res.status(400).json({ message: "vous ne posséder pas cette anonnce" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/offer/picture-delete", isAuthentificated, async (req, res) => {
  console.log("route : /offer/picture-delete");
  try {
    const { assetId, publicId, offerId } = req.fields;
    if (assetId && publicId && offerId) {
      const user = await User.findById(req.user._id);
      const offer = await Offer.findById(offerId);

      if (String(user._id) === String(offer.owner)) {
        await cloudinary.uploader.destroy(publicId);

        const tab = offer.product_picture;

        tab.map((picture, index) => {
          if (picture.asset_id === assetId) {
            tab.splice(index, 1);
          }
        });

        await offer.save();
        res.status(200).json({ message: "Image suprimé" });
      } else {
        res.status(400).json({ message: "Non Autorisé" });
      }
    } else {
      res.status(400).json({ message: "Fields missing" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.post(
  "/offer/picture-profile-change",
  isAuthentificated,
  async (req, res) => {
    console.log(" road: /offer/picture-add");
    try {
      const { offerId } = req.fields;
      const picture = req.files.picture.path;

      if (offerId && picture) {
        const user = await User.findById(req.user._id);
        const offer = await Offer.findById(offerId);
        if (String(user._id) === String(offer.owner)) {
          const public_id = offer.product_picture[0].public_id;
          await cloudinary.uploader.destroy(public_id);

          const result = await cloudinary.uploader.upload(picture, {
            folder: `vinted/offer/${offer._id}`,
          });
          offer.product_picture.shift();
          offer.product_picture.unshift(result);
          offer.product_image = result;

          offer.save();

          res.status(200).json(offer);
        } else {
          res.status(400).json({ message: "Non Autorisé" });
        }
      } else {
        res.status(400).json({ message: "fields missing" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.post("/offer/picture-add", isAuthentificated, async (req, res) => {
  console.log(" road: /offer/picture-add");
  try {
    const { offerId } = req.fields;
    const picture = req.files.picture.path;

    if (offerId) {
      const user = await User.findById(req.user._id);
      const offer = await Offer.findById(offerId);
      if (String(user._id) === String(offer.owner)) {
        const result = await cloudinary.uploader.upload(picture, {
          folder: `vinted/offer/${offer._id}`,
        });
        offer.product_picture.push(result);
        offer.save();
        res.status(200).json(offer);
      } else {
        res.status(400).json({ message: "Non Autorisé" });
      }
    } else {
      res.status(400).json({ message: "fields missing" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/offer/delete", isAuthentificated, async (req, res) => {
  console.log("route: /offer/delete");
  try {
    const offer = await Offer.findById(req.fields.id);

    const deletepic = await cloudinary.api.delete_resources_by_prefix(
      `vinted/offer/${offer._id}`
    );
    const deletefold = await cloudinary.api.delete_folder(
      `vinted/offer/${offer._id}`
    );
    await offer.deleteOne();
    res.status(200).json({ message: "offer deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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
router.get("/offers-auth", isAuthentificated, async (req, res) => {
  console.log("route: /offers-auth");
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
    const user = await User.findById(req.user._id);
    const favoritesOffers = user.favoritesOffer;

    for (let i = 0; i < offers.length; i++) {
      offers[i].favorite = false;
    }
    for (let i = 0; i < offers.length; i++) {
      for (let p = 0; p < favoritesOffers.length; p++) {
        if (String(offers[i]._id) === String(favoritesOffers[p]._id)) {
          offers[i].favorite = true;
        }
      }
    }

    res.status(200).json({
      count: count,
      offers: offers,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/offer/favorite", isAuthentificated, async (req, res) => {
  console.log("route: /offer/favorite ");
  try {
    const {
      _id,
      product_details,
      product_picture,
      product_image,
      owner,
      product_name,
      product_description,
      product_price,
    } = req.fields;

    if (
      _id &&
      product_details &&
      product_picture &&
      product_image &&
      owner &&
      product_name &&
      product_description &&
      product_price
    ) {
      const newUser = await User.findById(req.user._id);
      const tab = newUser.favoritesOffer;
      for (let i = 0; i < tab.length; i++) {
        if (tab[i]._id === _id) {
          newUser.favoritesOffer.splice(i, 1);
          await newUser.save();
          return res.status(200).send(`${product_name} suprimé`);
        }
      }
      req.fields.favorite = true;
      newUser.favoritesOffer.push(req.fields);
      await newUser.save();

      res.status(200).send(`${product_name} ajouté`);
    } else {
      res.status(400).json({ message: "missing properties" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/offer/delete-favorite", isAuthentificated, async (req, res) => {
  console.log("route: /offer/delete-favorite");
  const { idToDelete } = req.fields;
  try {
    const user = await User.findById(req.user._id);
    user.favoritesOffer.map((offer, index) => {
      if (offer._id === idToDelete) {
        return user.favoritesOffer.splice(index, 1);
      } else return "";
    });
    user.save();
    res.status(200).send("Annonce suprimé des favoris");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/offer-auth/:id", isAuthentificated, async (req, res) => {
  console.log("route: /offer/:id ");
  try {
    const id = req.params.id;
    const user = await User.findById(req.user._id);
    const offer = await Offer.findById(id)
      .populate({
        path: "owner",
        select: "account avatar",
      })
      .populate({
        path: "account",
        select: " avatar",
      });
    if (offer) {
      const offerFavovite = user.favoritesOffer;
      for (let i = 0; i < offerFavovite.length; i++) {
        if (String(offerFavovite[i]._id) === String(offer._id)) {
          offer.favorite = true;
          return res.status(200).json(offer);
        }
      }

      offer.favorite = false;
      res.status(200).json(offer);
    } else {
      res.status(400).json({ message: "Cette annonce existe plus" });
    }
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
