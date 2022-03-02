const { Router } = require('express');
const productController=require('../Controller/productController');
const {  adminMiddleware, requireSignIn} = require('../middleware/auth');
const multer = require('multer');
const shortid= require('shortid');
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();
router.post('/product/create',requireSignIn,requireSignIn, upload.array('productpicture'), productController.createProduct_post);
router.get('/products/:slug', productController.getProductsBySlug);
router.get("/product/:productId", productController.getProductDetailsById);
router.delete("/product/deleteProductById", requireSignIn, adminMiddleware, productController.deleteProductById);
router.post("/product/getProducts", requireSignIn, adminMiddleware, productController.getProducts);
module.exports = router;