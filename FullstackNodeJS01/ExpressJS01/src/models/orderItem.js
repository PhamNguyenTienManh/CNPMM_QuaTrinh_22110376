// models/OrderItem.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    productVariantId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // giá tại thời điểm mua
    promotionPrice: { type: Number }         // nếu có khuyến mãi
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderItem", orderItemSchema);
