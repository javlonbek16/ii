const router = require("express").Router();
const { getProduct, postProduct, putProduct, deleteProduct, getProductOne } = require("../../controllers/crud/product.controller");

router.get("/product/", getProduct);
router.get("/product/get/:id", getProductOne);
router.post("/product/create", postProduct);
router.put("/product/edit/:id", putProduct);
router.delete("/product/delete/:id", deleteProduct);

module.exports = router;


