import express from 'express'; // Nạp express
import bodyParser from 'body-parser'; // Nạp body-parser để lấy tham số từ client /user?id=7
import configViewEngine from './config/viewEngine'; // Nạp viewEngine
import initWebRoutes from './route/web'; 
import connectDB from './config/configdb'; // Nạp kết nối DB
import dotenv from 'dotenv'; // Nạp dotenv để làm việc với biến môi trường

// Khởi tạo dotenv
dotenv.config();

const app = express(); // Khai báo kiểu cho app là express.Application

// Cấu hình app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);
initWebRoutes(app);
connectDB();

const port: number = Number(process.env.PORT) || 6969; // Lấy port từ .env, nếu không có thì mặc định là 6969

// Chạy server
app.listen(port, () => {
    console.log(`Backend Nodejs is running on the port: ${port}`);
});