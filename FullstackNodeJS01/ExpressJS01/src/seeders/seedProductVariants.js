const mongoose = require("mongoose");
const Product = require("../models/product");
const Color = require("../models/color");
const Size = require("../models/size");
const ProductVariant = require("../models/productVariant");

const MONGO_URI = "mongodb://localhost:27017/fullstack01";

const seedProductVariants = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Xoá dữ liệu cũ
    await ProductVariant.deleteMany({});

    // Lấy tất cả sản phẩm
    const products = await Product.find();

    for (const product of products) {
      // Lấy màu + size của sản phẩm
      const colors = await Color.find({ productId: product._id });
      const sizes = await Size.find({ productId: product._id });

      let variants = [];

      // Ghép từng cặp color + size
      for (const color of colors) {
        for (const size of sizes) {
          variants.push({
            productId: product._id,
            colorId: color._id,
            sizeId: size._id,
            quantity: Math.floor(Math.random() * 50) + 10, // random 10-60
          });
        }
      }

      // Insert vào DB
      const insertedVariants = await ProductVariant.insertMany(variants);

      // Cập nhật Product với danh sách variantIds
      const variantIds = insertedVariants.map((v) => v._id);
      await Product.findByIdAndUpdate(product._id, {
        $set: { productVariants: variantIds },
      });
    }

    console.log("✅ Seed product variants thành công!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Lỗi seed product variants:", err);
    process.exit(1);
  }
};

seedProductVariants();
