// seedSizes.js
const mongoose = require("mongoose");
const Size = require("../models/size");
const Product = require("../models/product");

const MONGO_URI = "mongodb://localhost:27017/fullstack01";

const seedSizes = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Xoá dữ liệu cũ
    await Size.deleteMany({});

    // Lấy toàn bộ sản phẩm
    const products = await Product.find();

    for (const product of products) {
      const sizes = [
        { name: "39", productId: product._id },
        { name: "40", productId: product._id },
        { name: "41", productId: product._id },
        { name: "42", productId: product._id },
      ];
      await Size.insertMany(sizes);
    }

    console.log("✅ Seed sizes theo từng product thành công!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Lỗi seed sizes:", err);
    process.exit(1);
  }
};

seedSizes();
