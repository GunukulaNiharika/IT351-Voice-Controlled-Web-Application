const express = require('express');
const router = express.Router();
const {signin_post, signup_post,signout, checkUser} = require('../Controller/authController')
const {requireSignIn} = require('../middleware/auth')

router.get('/',requireSignIn,checkUser);
router.post('/signin', signin_post);
router.post('/signup', signup_post);
router.post('/signout', signout);
// router.get('/profile',requireSignIn,checkUser);


module.exports = router;