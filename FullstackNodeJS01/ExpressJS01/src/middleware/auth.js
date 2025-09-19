// middlewares/auth.js
require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const white_lists = ["/", "/register", "/login"];

  // Nếu URL nằm trong white_list thì cho qua luôn
  if (white_lists.find((item) => "/v1/api" + item === req.originalUrl)) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Bạn chưa truyền Access Token ở header",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Gắn thông tin user vào request
    req.user = {
      id: decoded.id,       // 👈 lấy id từ token
      email: decoded.email,
      name: decoded.name,
    };

    console.log(">>> check token decoded: ", decoded);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token bị hết hạn hoặc không hợp lệ",
    });
  }
};

module.exports = auth;
