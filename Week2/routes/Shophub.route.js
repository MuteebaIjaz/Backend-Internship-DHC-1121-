const express = require("express");
const router = express.Router();

const {
    getHome,
    getProducts,
    getProductDetails
} = require("../Controllers/product.controller.js");




router.get("/", getHome);

router.get("/products", getProducts);

router.get("/products/:id", getProductDetails);


module.exports = router;