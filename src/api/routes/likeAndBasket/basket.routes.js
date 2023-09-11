const router = require("express").Router();
const { addbasket, removebasket, getbasketProduct } = require('../../controllers/likeAndBasket/basketed.controller');
router.post('/add-basket', addbasket);
router.post('/remove-basket', removebasket);
router.get('/get-basket', getbasketProduct);


module.exports = router;
