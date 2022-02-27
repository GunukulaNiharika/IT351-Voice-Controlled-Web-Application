const { Router } = require('express');
const cartController=require('../Controller/cartController');
const {  userMiddleware, requireSignIn} = require('../middleware/auth')

const router = Router();
router.post('/user/cart/add-to-cart',requireSignIn,userMiddleware,cartController.addItemToCart);

module.exports = router;