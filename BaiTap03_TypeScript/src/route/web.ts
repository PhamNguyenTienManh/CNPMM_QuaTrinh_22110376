import express from "express"; //gọi Express
import {getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD,} from "../controller/homeController.ts"; //gọi controller

let router = express.Router();  //khởi tạo Route

let initWebRoutes = (app) => {
    //cách 1:
    router.get('/', (req,res) => {
        return res.send('Phạm Nguyễn Tiến Mạnh');
    });
    //cách 2: gọi hàm trong controller
    router.get('/home', getHomePage); //url cho trang chủ
    router.get('/about', getAboutPage); //url cho trang about
    router.get('/crud', getCRUD);
    router.get('/get-crud', getFindAllCrud);
    router.post('/post-crud', postCRUD);
    router.get('/edit-crud', getEditCRUD);
    router.post('/put-crud', putCRUD);
    router.get('/delete-crud', deleteCRUD);


     //url cho trang about
    return app.use("/", router); //url mặc định
}

export default initWebRoutes;