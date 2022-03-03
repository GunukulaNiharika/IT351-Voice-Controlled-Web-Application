const { Router } = require('express');
const cartController=require('../Controller/cartController');
const {  userMiddleware, requireSignIn} = require('../middleware/auth')

const router = Router();
router.post('/user/cart/addtocart',requireSignIn,userMiddleware,cartController.addItemToCart);
router.post("/user/getCartItems", requireSignIn, userMiddleware, cartController.getCartItems);
//new update
router.post("/user/cart/removeItem", requireSignIn, userMiddleware,cartController.removeCartItems);

module.exports = router;