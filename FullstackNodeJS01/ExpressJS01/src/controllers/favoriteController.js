const {addFavoriteProductToUser, removeProductFromFavorite, getFavoriteByUser, isFavoriteProductOfUser} = 
    require("../services/favoriteService");


const getFavorites = async (req, res) => {
  try {
    const favorites = await getFavoriteByUser(req.user.id);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const favorite = await addFavoriteProductToUser(req.user.id, productId);
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const favorite = await removeProductFromFavorite(req.user.id, productId);
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const isFavoriteProductOfUserController = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await isFavoriteProductOfUser(req.user.id, productId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addFavorite, removeFavorite, getFavorites, isFavoriteProductOfUserController};
