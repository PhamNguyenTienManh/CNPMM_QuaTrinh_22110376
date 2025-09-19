// models/Size.js
const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Size", sizeSchema);
