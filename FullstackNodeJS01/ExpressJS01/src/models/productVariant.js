// models/ProductVariant.js
const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    colorId: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
    sizeId: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductVariant", productVariantSchema);
