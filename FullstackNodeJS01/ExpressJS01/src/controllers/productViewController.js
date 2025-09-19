const { addProductView, getRecentProductViews } = require("../services/productViewService");



const addProductViewController = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const view = await addProductView(userId, productId);
    res.status(201).json(view);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecentProductViewsController = async (req, res) => {
  try {
    const recentViews = await getRecentProductViews(req.user.id);
    res.json(recentViews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addProductViewController, getRecentProductViewsController };
