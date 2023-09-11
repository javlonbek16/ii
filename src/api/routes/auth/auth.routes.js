const router = require("express").Router();
const { register, login } = require("../../controllers/auth/auth.controller");
const { verify } = require("../../controllers/auth/verify.controller");

router.post("/auth/register", register);
router.post('/auth/verify', verify);
router.post("/auth/login", login);

module.exports = router;
