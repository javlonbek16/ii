const router = require("express").Router();
const { getWhatCt, postWhatCt, putWhatCt, deleteWhatCt} = require("../../controllers/crud/whatCt.controller");

router.get("/whatCt/", getWhatCt);
router.post("/whatCt/create", postWhatCt);
router.put("/whatCt/edit/:id", putWhatCt);
router.delete("/whatCt/delete/:id", deleteWhatCt);

module.exports = router;

