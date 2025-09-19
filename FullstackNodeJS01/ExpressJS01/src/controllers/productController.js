const { getProducts, getProductInfo, getSimilarProducts } = require("../services/productService");

const getProductPagination = async (req, res) => {
  try {
    const { categoryId, q } = req.query;
    const page = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const priceIncrease = req.query.priceIncrease === 'true';
    const priceDecrease = req.query.priceDecrease === 'true';
    const newest = req.query.newest === 'true'; 

    const responseData = await getProducts({ 
      categoryId, 
      page, 
      limit, 
      q, 
      priceIncrease, 
      priceDecrease,
      newest 
    });

    res.json(responseData);
  } catch (error) {
    console.error("Error get products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductInfoController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductInfo(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSimilarProductsController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getSimilarProducts(id);

    if (!product) {
      return res.status(404).json({ message: "Products similar not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { getProductPagination, getProductInfoController, getSimilarProductsController};