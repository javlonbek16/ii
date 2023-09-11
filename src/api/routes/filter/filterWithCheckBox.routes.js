const router = require("express").Router();
const { filterProductsByBrandName } = require("../../controllers/filterController/brandFilter.controller");
const { filterProductsByCategoryName } = require("../../controllers/filterController/categoryFilter.controller");
const { filterProductsByStatusName } = require("../../controllers/filterController/statusFilter");
const { filterProductsByMerchantName } = require("../../controllers/filterController/merchantNames");


router.get("/get/brand", filterProductsByBrandName);
router.get("/get/category", filterProductsByCategoryName);
router.get("/get/status", filterProductsByStatusName);
router.get("/get/merchantName", filterProductsByMerchantName);


module.exports = router;
