const path = require("path");
const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// ROUTES
app.post("/payment", async (req, res) => {
  const { token, amount } = req.body;

  const payment = {
    source: token.id,
    amount,
    currency: "usd",
  };
  const paymentIntent = await stripe.charges.create(payment);
  res.send(paymentIntent);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
