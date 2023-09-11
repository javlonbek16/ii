const router = require("express").Router();

const { filterProductsByKatalogName } = require("../../controllers/filterController/katalogFilter");
const { filterProductsByWhatCt } = require("../../controllers/filterController/whatCtFilter");
const { filterProductsByWhy } = require("../../controllers/filterController/whyFilter");

router.get("/get/katalog", filterProductsByKatalogName);
router.get("/get/whatct", filterProductsByWhatCt);
router.get("/get/whysh", filterProductsByWhy);

module.exports = router;

