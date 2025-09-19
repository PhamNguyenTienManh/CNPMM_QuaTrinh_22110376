// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Import Routes và Route từ react-router-dom
import Login from './components/auth/loginComponent/LoginComponent';
import Register from './components/auth/registerComponent/RegisterComponent';
import HomePage from './components/homePageComponent/HomePage';
import ProductDetail from './components/productDetailComponent/ProductDetailPage';
import FavoritePage from './components/favoriteComponent/FavoritePage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Đăng nhập */}
        <Route path="/register" element={<Register />} /> 
        <Route path="/home" element={<HomePage />} />{/* Thêm route cho trang Verify OTP */}
        <Route path="/" element={<Login />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/favorite" element={<FavoritePage />} />
      </Routes>
    </div>
  );
}

export default App;
