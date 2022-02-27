const { Router } = require('express');
const categoryController=require('../Controller/categoryController');
const {  adminMiddleware, requireSignIn, upload} = require('../middleware/auth');


const router = Router();
router.post('/category/create',requireSignIn,adminMiddleware, upload.single('categoryImage'), categoryController.addCategory_post);
router.post('/category/update',requireSignIn,adminMiddleware, upload.array('categoryImage'), categoryController.updateCategory_post);
router.post('/category/delete',requireSignIn,adminMiddleware, categoryController.deleteCategory_post);
router.get('/category/getcategory',categoryController.getCategories_get);

module.exports = router;