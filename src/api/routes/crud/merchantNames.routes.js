const router = require("express").Router();
const { getMerchantNames, postMerchantNames, putMerchantNames, deleteMerchantNames } = require("../../controllers/crud/merchantNames");

router.get("/merchantNames/", getMerchantNames);
router.post("/merchantNames/create", postMerchantNames);
router.put("/merchantNames/edit/:id", putMerchantNames);
router.delete("/merchantNames/delete/:id", deleteMerchantNames);

module.exports = router;

