const { Router } = require("express")
const { getBrand, postBrand, putBrand, deleteBrand } = require("../../controllers/crud/brand.controller");
const router = Router();
router.get("/brand/", getBrand);
router.post("/brand/create", postBrand);
router.put("/brand/edit/:id", putBrand);
router.delete("/brand/delete/:id", deleteBrand);

module.exports = router;

