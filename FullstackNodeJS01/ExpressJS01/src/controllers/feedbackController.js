const {addFeedback, getFeedbackByProduct} = require("../services/feedBackService");

// POST /feedback
const addFeedbackController = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const feedback = await addFeedback({
      userId: req.user.id,
      productId,
      rating,
      comment,
    });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /feedback/:productId
const getFeedbackByProductController = async (req, res) => {
  try {
    const feedbacks = await getFeedbackByProduct(
      req.params.productId
    );
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addFeedbackController, getFeedbackByProductController};
