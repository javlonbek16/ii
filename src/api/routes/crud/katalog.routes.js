const router = require("express").Router();
const { getKatalog, postKatalog, putKatalog, deleteKatalog } = require("../../controllers/crud/katalog.controller");

router.get("/katalog/", getKatalog);
router.post("/katalog/create", postKatalog);
router.put("/katalog/edit/:id", putKatalog);
router.delete("/katalog/delete/:id", deleteKatalog);

module.exports = router;

