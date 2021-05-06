const express = require("express");
const router = express.Router();
const isAuthentificated = require("../midleware/isAuthentificated");
const stripe = require("stripe")(
  "sk_test_51IFvF7LU3nUcxY4gWJudbXS5m7XtjUj5fSPmOc0iHmaCQb3rFYaTe2vsNQzMYAU7HLsLuTyFJS9RTopuU6V8WNFZ00k2FITjUf"
);

router.post("/payment", isAuthentificated, async (req, res) => {
  console.log("route : /payment");
  try {
    const stripeToken = req.fields.stripeToken;
    console.log(req.fields);
    const response = await stripe.charges.create({
      amount: req.fields.price * 100,
      currency: "eur",
      description: req.fields.description,
      source: stripeToken,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
