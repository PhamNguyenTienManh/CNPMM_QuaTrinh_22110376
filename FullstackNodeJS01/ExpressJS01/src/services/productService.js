const Product = require("../models/product");

// Tạo sản phẩm
const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Lấy tất cả sản phẩm (có filter theo category, phân trang / lazy load)
const getProducts = async ({ categoryId, page = 1, limit = 10 }) => {
  const query = {};
  if (categoryId) query.categoryId = categoryId;

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(query).skip(skip).limit(limit).lean(),
    Product.countDocuments(query),
  ]);

  return {
    products,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

// Lấy sản phẩm theo ID
const getProductById = async (id) => {
  return await Product.findById(id).lean();
};

// Cập nhật sản phẩm
const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Xóa sản phẩm
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
    createProduct, getProducts, getProductById, updateProduct, deleteProduct
}