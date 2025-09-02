// src/services/auth/authApi.ts
import axios from 'axios';
import instance from './axios.customize'; 

const API_URL = 'http://localhost:8080/v1/api';

// Đăng ký user
export const registerUser = async (data: {name: string, email: string, password: string}) => {
  return await axios.post(`${API_URL}/register`, data);
};

// Đăng nhập user
export const loginUser = async (loginData: { email: string; password: string }) => {
  return await axios.post(`${API_URL}/login`, loginData);
};

export const getUserApi = () =>{
  return instance.get(`${API_URL}/user`);
}

// // API gọi thử protected route
export const getProtected = async () => {
  return instance.get(`${API_URL}/account`);
};
