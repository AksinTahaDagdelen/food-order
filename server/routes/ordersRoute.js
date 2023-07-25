const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51MV9UICjhQoRekzJT8ILXDbRnYt2zLyIABEoyrWvnyzzOZ0JdohniOcdF0iHdsv8b04VghHOEB4r50yVEsuG7jxb00nBe43OH4"
);
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const orderModel = require("../models/orderModel");
const app = express();

app.use(cors());

router.post("/checkoutorder", async (req, res) => {
  const { token, toplamfiyat, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: toplamfiyat * 100,
        currency: "TRY",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newOrder = new orderModel({
        name: currentUser.name,
        email: currentUser.mail,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: toplamfiyat,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          zipCode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });

      newOrder.save();

      res.send("Ödeme Başarıyla Gerçekleşti");
    } else {
      res.send("upps bir şeyler ters gitti..");
    }
  } catch (error) {
    res.status(400).json({ message: "Ödeme Başarısız", error });
  }
});

//users orders

router.post("/getusersorders", async (req, res) => {
  const { userid } = req.body;

  try {
    const orders = await orderModel.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    res.status(400).json({ message: "Siparişlere Erişilemiyor", error });
  }
});

module.exports = router;
