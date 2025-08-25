import express from "express"; 
// cú pháp khác tương đương: var express = require('express');
// javascript theo ES6

let configViewEngine = (app) => {
  app.use(express.static("./src/public")); // Thiết lập thư mục tĩnh chứa images, css,..
  app.set("view engine", "ejs");           // Thiết lập view engine
  app.set("views", "./src/views");         // Thư mục chứa views
}

module.exports = configViewEngine; // xuất hàm ra
