// seedColors.js
const mongoose = require("mongoose");
const Color = require("../models/color");
const Product = require("../models/product");

const MONGO_URI = "mongodb://localhost:27017/fullstack01";

const seedColors = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Xoá dữ liệu cũ
    await Color.deleteMany({});

    // Lấy toàn bộ sản phẩm
    const products = await Product.find();

    for (const product of products) {
  const colors = [
    { name: "Xanh dương", hex: "#0000FF", productId: product._id },
    { name: "Vàng", hex: "#FFFF00", productId: product._id },
    { name: "Xám", hex: "#808080", productId: product._id },
  ];
  await Color.insertMany(colors);
}


    console.log("✅ Seed colors theo từng product thành công!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Lỗi seed colors:", err);
    process.exit(1);
  }
};

seedColors();
