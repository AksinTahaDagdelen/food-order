const express = require("express");
const burgerModel = require("../models/burgerModel");
const router = express.Router();

//GET ALL FOODS endpointi
router.get("/getBurgers", (req, res) => {
  burgerModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//put

//silme metodu (post kullanarak)

router.post("/deleteBurger", async (req, res) => {
  const burgerid = req.body.burgerid;
  //  const {burgerid} = req.body --> destruct ederek alma

  try {
    await burgerModel.findOneAndDelete({ _id: burgerid });
    res.send("Menü silme başarılı");
  } catch {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
