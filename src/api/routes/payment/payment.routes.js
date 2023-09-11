const router = require("express").Router();
const { AddMoney } = require('../../controllers/payment/Payment.controller');

router.post('/top-up-wallet', AddMoney);
// router.post('/purchase-product', );

module.exports = router;