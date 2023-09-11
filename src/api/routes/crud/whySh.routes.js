const router = require("express").Router();
const { getWhySh, postWhySh, putWhySh, deleteWhySh } = require("../../controllers/crud/whySh.controller");

router.get("/whysh/", getWhySh);
router.post("/whysh/create", postWhySh);
router.put("/whysh/edit/:id", putWhySh);
router.delete("/whysh/delete/:id", deleteWhySh);

module.exports = router;

