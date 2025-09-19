const ProductView = require("../models/viewedProduct");

const addProductView = async (userId, productId) => {
  // Tìm bản ghi đã tồn tại
  let view = await ProductView.findOne({ userId, productId });

  if (view) {
    // Nếu đã có thì update lại viewedAt
    view.viewedAt = Date.now();
    return await view.save();
  } else {
    // Nếu chưa có thì tạo mới
    view = new ProductView({
      userId,
      productId,
    });
    return await view.save();
  }
};

const getRecentProductViews = async (userId) => {
  return await ProductView.find({ userId })
    .populate("productId", "name price imageUrl")
    .sort({ viewedAt: -1 }) // sắp xếp mới nhất trước
    .skip(1)                // bỏ qua 1 thằng mới nhất
    .limit(5)               // lấy 5 thằng tiếp theo
    .exec();
};


module.exports = { addProductView, getRecentProductViews };
