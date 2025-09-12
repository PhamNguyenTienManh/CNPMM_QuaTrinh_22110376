const { getProducts } = require("../services/productService");

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

module.exports = { getProductPagination };