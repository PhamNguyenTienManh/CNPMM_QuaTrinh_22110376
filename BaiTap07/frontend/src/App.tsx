// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Import Routes và Route từ react-router-dom
import Login from './components/auth/loginComponent/LoginComponent';
import ForgotPassword from './components/auth/forgotPasswordComponent/ForgotPasswordComponent'; // Giả sử bạn có ForgotPassword component
import VerifyOtp from './components/auth/verifyOtp/VerifyOtpComponent';  // Import VerifyOtp component
import Register from './components/auth/registerComponent/RegisterComponent';
import ResetPassword from './components/auth/forgotPasswordComponent/ResetPassword'; // Import ResetPassword component

import CartPage from './components/cartPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Đăng nhập */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> 
        {/* <Route path="/verify-otp-reset" element={<VerifyOtp />} /> */}
        <Route path="/register" element={<Register />} /> 
        <Route path="/verify-otp" element={<VerifyOtp />} /> 
        <Route path="/" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
