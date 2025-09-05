const mongoose = require('mongoose');
const Category = require('../models/category');
const Product = require('../models/product');

const MONGO_URI = 'mongodb://localhost:27017/fullstack01';

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Tìm category Sneaker và Sandals
    const sneakersCategory = await Category.findOne({ name: 'Sneakers' });
    const sandalsCategory = await Category.findOne({ name: 'Sandals' });

    if (!sneakersCategory || !sandalsCategory) {
      console.log("Cần seed categories trước khi seed products!");
      process.exit(1);
    }

    // Xoá dữ liệu cũ để tránh bị nhân đôi
    await Product.deleteMany({});

    // Tạo 15 sản phẩm cho Sneakers
    const sneakersProducts = Array.from({ length: 15 }, (_, i) => ({
      name: `Sneaker ${i + 1}`,
      description: `Mẫu sneaker ${i + 1} thời trang`,
      price: 1000000 + i * 50000,
      image: "",
      categoryId: sneakersCategory._id,
    }));

    // Tạo 15 sản phẩm cho Sandals
    const sandalsProducts = Array.from({ length: 15 }, (_, i) => ({
      name: `Sandal ${i + 1}`,
      description: `Mẫu sandal ${i + 1} mùa hè`,
      price: 500000 + i * 30000,
      image: "",
      categoryId: sandalsCategory._id,
    }));

    // Insert tất cả
    await Product.insertMany([...sneakersProducts, ...sandalsProducts]);

    console.log('Seed products thành công!');
    process.exit(0);
  } catch (err) {
    console.error('Lỗi seed products:', err);
    process.exit(1);
  }
};

seedProducts();
