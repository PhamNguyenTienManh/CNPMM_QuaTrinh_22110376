const mongoose = require("mongoose");
const User = require("../models/user");
const Product = require("../models/product");
const Feedback = require("../models/feedback");

const MONGO_URI = "mongodb://localhost:27017/fullstack01";

const seedFeedbacks = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Feedback.deleteMany({});
    console.log("🧹 Xóa dữ liệu Feedback cũ thành công!");

    const users = await User.find({});
    const products = await Product.find({});

    if (!users.length || !products.length) {
      console.log("⚠️ Cần seed Users và Products trước khi seed Feedbacks!");
      process.exit(1);
    }

    const comments = [
      "Sản phẩm rất đẹp và chất lượng!",
      "Hơi chật một chút nhưng vẫn ổn.",
      "Màu sắc giống hình, giao hàng nhanh.",
      "Giá hơi cao nhưng đáng tiền.",
      "Tôi sẽ mua lại lần nữa!",
    ];

    let feedbackData = [];

    for (const product of products) {
      // Mỗi product có từ 1–3 feedback
      const feedbackCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < feedbackCount; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomRating = Math.floor(Math.random() * 5) + 1;
        const randomComment =
          comments[Math.floor(Math.random() * comments.length)];

        feedbackData.push({
          productId: product._id,
          userId: randomUser._id,
          rating: randomRating,
          comment: randomComment,
        });
      }
    }

    await Feedback.insertMany(feedbackData);
    console.log("✅ Seed Feedbacks thành công!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Lỗi seed Feedbacks:", err);
    process.exit(1);
  }
};

seedFeedbacks();
