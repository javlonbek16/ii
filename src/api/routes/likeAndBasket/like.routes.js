const router = require("express").Router();
const { addLike, removeLike, getLikeProduct } = require('../../controllers/likeAndBasket/like.controller');
router.post('/add-like', addLike);
router.post('/remove-like', removeLike);
router.get('/get-like', getLikeProduct);

module.exports = router;
