import db from "../models/index.ts";
import {createNewUser,getAllUser,getUserInfoById,updateUser,deleteUserById} from "../services/CRUDService.ts";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

let getAboutPage = (req, res) => {
    return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await createNewUser(req.body);
    console.log(message);
    return res.send("Post crud to server");
};

let getFindAllCrud = async (req, res) => {
    let data = await getAllUser();
    return res.render("users/findAllUser.ejs", {
        datalist: data,
    });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await getUserInfoById(userId);
        return res.render("users/updateUser.ejs", {
            data: userData,
        });
    } else {
        return res.send("Users not found");
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await updateUser(data);
    return res.render("users/findAllUser.ejs", {
        datalist: allUsers,
    });
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await deleteUserById(id);
        return res.send("Deleted!!!!!!!!!!!!!");
    } else {
        return res.send("User not found!!!!!!!!!!!!!");
    }
};

export {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD,}