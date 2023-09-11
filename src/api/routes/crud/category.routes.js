const router = require("express").Router();
const { getCategory, postCategory, putCategory, deleteCategory } = require("../../controllers/crud/category.controller");

router.get("/category/", getCategory);
router.post("/category/create", postCategory);
router.put("/category/edit/:id", putCategory);
router.delete("/category/delete/:id", deleteCategory);

module.exports = router;

