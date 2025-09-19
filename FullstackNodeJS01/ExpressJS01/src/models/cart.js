// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
