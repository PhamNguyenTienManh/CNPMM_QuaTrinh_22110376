const Feedback = require("../models/feedback");
require("../models/user");

const addFeedback = async ({ userId, productId, rating, comment }) => {
  // Nếu chưa có thì tạo mới
  const feedback = new Feedback({
    userId,
    productId,
    rating,
    comment,
  });

  return await feedback.save();
};

const getFeedbackByProduct = async (productId) => {
  return await Feedback.find({ productId })
    .select("rating comment createdAt") // chỉ lấy các field cần từ Feedback
    .populate("userId", "name") // từ User chỉ lấy name thôi
    .sort({ createdAt: -1 }) // feedback mới nhất trước
    .exec();
};


// const deleteFeedback = async ({ feedbackId, userId, isAdmin = false }) => {
//   const feedback = await Feedback.findById(feedbackId);
//   if (!feedback) {
//     throw new Error("Feedback not found");
//   }

//   // Chỉ user tạo feedback hoặc admin mới được xóa
//   if (!isAdmin && feedback.userId.toString() !== userId.toString()) {
//     throw new Error("Not authorized to delete this feedback");
//   }

//   return await Feedback.findByIdAndDelete(feedbackId);
// };

module.exports = {
  addFeedback,
  getFeedbackByProduct,
};
