const express = require('express');
const { requireSignIn, adminMiddleware } = require('../../middleware/auth');
const initialDataController= require('../../controller/admin/initialDataController')
const router = express.Router();


router.post('/initialdata', requireSignIn, adminMiddleware, initialDataController.initialData_post);


module.exports = router;