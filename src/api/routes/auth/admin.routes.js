const router = require("express").Router();
const { loginAdmin } = require("../../controllers/auth/admin.controller")

router.post("/auth/admin", loginAdmin);

module.exports = router;
