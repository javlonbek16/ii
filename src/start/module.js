require("dotenv/config");
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const routes = require("../api/routes/");



const modules = (app) => {
    app.use(express.json());
    app.use(fileUpload());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use("/uploads", express.static(process.cwd() + "/uploads"));
    app.use(routes)
    app.use((err, req, res, next) => {
     
        res.status(500).json({ message: "Interval Server Eror" });
    });
}

module.exports = modules
