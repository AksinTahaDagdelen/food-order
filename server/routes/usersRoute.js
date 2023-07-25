const express = require("express");
const orderModel = require("../models/orderModel");
const UserModel = require("../models/userModel");
const router = express.Router();

//Register Endpoint
router.post("/register", async (req, res) => {
  const { name, mail, password } = req.body;

  const oldUser = await UserModel.findOne({ mail: mail });
  if (oldUser) {
    res.status(400).json({ message: "Böyle bir kullanıcı bulunmaktadır" });
  } else {
    const newUser = new UserModel({
      name: name,
      mail: mail,
      password: password,
    });

    try {
      await newUser.save();
      res.send(newUser);
    } catch (error) {
      res.send("user register failed");
    }
  }
});

//Login EndPoint
router.post("/login", async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await UserModel.find({ mail: mail, password: password });

    if (user.length > 0) {
      res.send(user[0]);
    } else {
      // res.send("böyle bir kullanıcı yok");
      res.status(400).json({ message: "Böyle bir kullanıcı bulunmamaktadır" });
    }
  } catch (error) {
    res.send(error);
  }
});

//get all users
router.get("/getAllUsers", (req, res) => {
  burgerModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
