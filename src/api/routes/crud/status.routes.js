const router = require("express").Router();
const { getStatus, postStatus, putStatus, deleteStatus } = require("../../controllers/crud/status.controller");

router.get("/status/", getStatus);
router.post("/status/create", postStatus);
router.put("/status/edit/:id", putStatus);
router.delete("/status/delete/:id", deleteStatus);

module.exports = router;

