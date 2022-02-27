const express = require('express');
const router = express.Router();
const {signin_post, signup_post, signout} = require('../../Controller/admin/authController')


router.post('/admin/signin', signin_post);
router.post('/admin/signup', signup_post);
router.post('/admin/signout', signout);


module.exports = router;