const express = require('express');
const { createUser, handleLogin, getUser,
    getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { getProductPagination, getProductInfoController, getSimilarProductsController } = require('../controllers/productController');
const { getCategory } = require('../controllers/categoryController');
const {addFeedbackController, getFeedbackByProductController} = require("../controllers/feedbackController")
const { addProductViewController, getRecentProductViewsController } = require("../controllers/productViewController");
const { getFavorites, addFavorite, removeFavorite, isFavoriteProductOfUserController } = require('../controllers/favoriteController');

const routerAPI = express.Router();

routerAPI.use(auth);

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api");
});

// Auth
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

// Product
routerAPI.get("/products", getProductPagination);
routerAPI.get("/products/:id", getProductInfoController);
routerAPI.get("/products-similar/:id", getSimilarProductsController)

// Category
routerAPI.get("/category", getCategory);

// Feedback
routerAPI.get("/feedback/:productId", getFeedbackByProductController);
routerAPI.post("/feedback", addFeedbackController);

// Favorite
routerAPI.get("/favorite", getFavorites);
routerAPI.post("/favorite", addFavorite);
routerAPI.delete("/favorite/:productId", removeFavorite);
routerAPI.get("/favorite/check/:productId", isFavoriteProductOfUserController);


// viewedProduct
routerAPI.post("/product-views", addProductViewController);
routerAPI.get("/product-views/recent", getRecentProductViewsController);

module.exports = routerAPI; //export default