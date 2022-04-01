const express = require('express');
const { requireSignIn, userMiddleware } = require('../middleware/auth');
const { addAddress, getAddress } = require('../Controller/addressController');
const router = express.Router();


router.post('/user/address/create', requireSignIn, userMiddleware, addAddress);
router.post('/user/getaddress', requireSignIn, userMiddleware, getAddress);

module.exports = router;