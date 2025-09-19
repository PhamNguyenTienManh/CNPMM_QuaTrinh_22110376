// models/Address.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: "Vietnam" },

    isDefault: { type: Boolean, default: false } // để đánh dấu địa chỉ mặc định
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
