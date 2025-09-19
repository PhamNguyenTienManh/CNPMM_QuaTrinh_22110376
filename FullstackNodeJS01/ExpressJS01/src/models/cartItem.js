// models/CartItem.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
    productVariantId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant", required: true },

    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true } // lưu giá tại thời điểm thêm vào giỏ
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
