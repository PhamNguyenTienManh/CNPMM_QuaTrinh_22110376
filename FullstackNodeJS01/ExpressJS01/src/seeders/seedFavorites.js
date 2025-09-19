const mongoose = require("mongoose");
const User = require("../models/user");
const Product = require("../models/product");
const Favorite = require("../models/favorite");

const MONGO_URI = "mongodb://localhost:27017/fullstack01";

const seedFavorites = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Favorite.deleteMany({});
    console.log("🧹 Xóa dữ liệu Favorite cũ thành công!");

    const users = await User.find({});
    const products = await Product.find({});

    if (!users.length || !products.length) {
      console.log("⚠️ Cần seed Users và Products trước khi seed Favorites!");
      process.exit(1);
    }

    let favoritesData = [];

    for (const user of users) {
      // Random số lượng sản phẩm yêu thích của mỗi user
      const randomCount = Math.floor(Math.random() * 5) + 1; // 1 - 5 sản phẩm
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      const favoriteProducts = shuffledProducts
        .slice(0, randomCount)
        .map((p) => p._id);

      favoritesData.push({
        userId: user._id,
        productId: favoriteProducts,
      });
    }

    await Favorite.insertMany(favoritesData);
    console.log("✅ Seed Favorites thành công!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Lỗi seed Favorites:", err);
    process.exit(1);
  }
};

seedFavorites();
