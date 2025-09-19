// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],

    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },

    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending"
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "credit_card", "paypal"],
      default: "cod"
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
