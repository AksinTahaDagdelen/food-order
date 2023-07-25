const express = require("express");
const cors = require("cors");
const db = require("./db");
const burgerModel = require("./models/burgerModel");
const app = express();
const burgersRoute = require("./routes/burgersRoute");
const usersRoute = require("./routes/usersRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use(express.json());
app.use(cors());

//routing blokları
//http://localhost:4000/api/burgers/getBurgers
app.use("/api/burgers/", burgersRoute);
app.use("/api/users/", usersRoute);
app.use("/api/orders/", ordersRoute);

//serverımızı inşa edeceğimiz portu belirleyerek ayağa kaldırdık.
app.listen(4000, () => {
  console.log(`Food Order Serverı 4000 portunda başarıyla ayağa kalktı 🔥🔥🔥`);
});
