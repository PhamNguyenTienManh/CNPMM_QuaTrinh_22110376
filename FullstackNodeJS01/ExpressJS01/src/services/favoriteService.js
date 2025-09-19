const Favorite = require("../models/favorite");
const Product = require ("../models/product");
const User = require ("../models/user");

const addFavoriteProductToUser = async (userId, productId) => {
  try {
    // Check userId có tồn tại không
    const userExists = await User.findById(userId);
    if (!userExists) {
      return { success: false, message: "User không tồn tại" };
    }

    // Check productId có tồn tại không
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return { success: false, message: "Product không tồn tại" };
    }

    // Xử lý favorite
    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      // Nếu user chưa có danh sách yêu thích thì tạo mới
      favorite = new Favorite({
        userId,
        productId: [productId]
      });
    } else {
      // Nếu đã có thì push thêm productId (nếu chưa tồn tại)
      if (!favorite.productId.includes(productId)) {
        favorite.productId.push(productId);
      } else {
        return { success: false, message: "Product đã có trong danh sách yêu thích" };
      }
    }

    await favorite.save();
    return { success: true, message: "Thêm vào yêu thích thành công", data: favorite };

  } catch (error) {
    console.error("Lỗi khi thêm vào favorite:", error);
    return { success: false, message: "Đã xảy ra lỗi server" };
  }
};



const getFavoriteByUser = async(userId) => {
    let favorite = await Favorite.findOne({userId});
    if (!favorite)
        return "You have no favorite";
    else
    {
        await favorite.populate("productId", "name price imageUrl categoryId");
        return favorite;
    } 
}

const removeProductFromFavorite = async (userId, productId) => {
    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      throw new Error("User have no favorite!");
    }

    favorite.productId = favorite.productId.filter(
      (id) => id.toString() !== productId.toString()
    );

    return await favorite.save();
}

const isFavoriteProductOfUser = async (userId, productId) => {
  try {
    const favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      return { isFavorite: false, message: "Người dùng chưa có danh sách yêu thích" };
    }

    const isFavorite = favorite.productId.includes(productId);

    return { isFavorite};
  } catch (error) {
    console.error("Lỗi khi kiểm tra favorite:", error);
    return { isFavorite: false, message: "Có lỗi xảy ra khi kiểm tra sản phẩm yêu thích" };
  }
};

module.exports = {
    addFavoriteProductToUser, removeProductFromFavorite, getFavoriteByUser, isFavoriteProductOfUser
}