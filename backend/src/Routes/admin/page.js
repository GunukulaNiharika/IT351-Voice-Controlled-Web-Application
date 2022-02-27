const express = require('express');
const { requireSignIn, adminMiddleware, upload } = require('../../middleware/auth');
const { createPage_post,getPage } = require('../../Controller/admin/pageController');
const router = express.Router();

router.post(`/page/create`, requireSignIn, adminMiddleware, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), createPage_post)

router.get(`/page/:category/:type`, getPage);

module.exports = router;