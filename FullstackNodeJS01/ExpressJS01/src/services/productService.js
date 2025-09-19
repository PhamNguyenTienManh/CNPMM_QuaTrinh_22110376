const Product = require("../models/product");
const ProductVariant = require("../models/productVariant");
const Color = require("../models/color");
const Size = require("../models/size");

const { elasticClient } = require("../config/elasticClient");
// Tạo sản phẩm
const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Lấy tất cả sản phẩm (có filter theo category, phân trang / lazy load)
const getProducts = async ({ categoryId, page = 1, limit = 10, q, priceIncrease = false, priceDecrease = false, newest = false }) => {
  const skip = (page - 1) * limit;

  // Khởi tạo queryBody, bao gồm cả mảng 'sort'
  const queryBody = {
    from: skip,
    size: limit,
    sort: [],
    query: {
      bool: {
        filter: categoryId ? [{ term: { categoryId } }] : []
      }
    }
  };

  // Thêm điều kiện sắp xếp vào mảng 'sort'
  if (priceIncrease) {
    queryBody.sort.push({ price: { order: "asc" } }); // Sắp xếp giá tăng dần
  } else if (priceDecrease) {
    queryBody.sort.push({ price: { order: "desc" } }); // Sắp xếp giá giảm dần
  } else if (newest) {
    queryBody.sort.push({ createdAt: { order: "desc" } }); // Sắp xếp mới nhất trước
  }
  // Nếu không có điều kiện nào, Elasticsearch sẽ sắp xếp theo _score mặc định

  if (q) {
    const queryTerms = q.trim().split(/\s+/);
    queryBody.query.bool.must = queryTerms.map(term => ({
      bool: {
        should: [
          { prefix: { name: term.toLowerCase() } },
          { fuzzy: { name: { value: term.toLowerCase(), fuzziness: "AUTO", prefix_length: 1 } } },
          { wildcard: { name: `*${term.toLowerCase()}*` } }
        ],
        minimum_should_match: 1
      }
    }));
  } else {
    if (!queryBody.query.bool.must) {
      queryBody.query = { bool: queryBody.query.bool };
      queryBody.query.bool.must = [{ match_all: {} }];
    }
  }

  const result = await elasticClient.search({
    index: "products",
    body: queryBody
  });

  const products = result.hits.hits.map(hit => ({
    id: hit._id,
    ...hit._source
  }));


  return {
    products,
    total: result.hits.total.value,
    currentPage: page,
    totalPages: Math.ceil(result.hits.total.value / limit),
  };
};

// Lấy những sản phẩm cùng loại (category)
const getSimilarProducts = async (productId) => {
  try {
    // Tìm product ban đầu để lấy categoryId
    const product = await Product.findById(productId).select("categoryId");
    if (!product) {
      throw new Error("Product not found");
    }

    // Lấy các sản phẩm cùng category nhưng loại bỏ product gốc
    const similarProducts = await Product.find({
      categoryId: product.categoryId,
      _id: { $ne: productId }, // loại bỏ chính nó
    })
      .select("name price imageUrl categoryId") // chỉ lấy field cần thiết
      .limit(10); // ví dụ chỉ lấy 10 sp tương tự

    return similarProducts;
  } catch (err) {
    console.error("Error getting similar products:", err);
    throw err;
  }
};


// Lấy sản phẩm theo ID
const getProductInfo = async (productId) => {
  return await Product.findById(productId)
    .populate("categoryId", "name") // chỉ lấy tên category
    .populate({
      path: "productVariants",
      populate: [
        { path: "colorId", select: "name hex" },
        { path: "sizeId", select: "name" }
      ]
    })
    .exec();
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
    createProduct, getProducts, getProductInfo, updateProduct, deleteProduct, getSimilarProducts
}