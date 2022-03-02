const Product = require("../models/product");
const slugify = require("slugify");
const shortid = require('shortid');
const Category = require('../models/Category');

module.exports.createProduct_post = async (req,res) => {
    try{
    const { name, price, description, category, quantity } = req.body;
    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
        return { img: file.filename };
        });
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user.id,
      });
      await product.save();
      res.status(201).json({product});
      //console.log(product);
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}

module.exports.getProductsBySlug = async(req,res) => {
    try{
    const { slug }=req.params;
    const category=await Category.findOne({ slug: slug}).select('_id name',);
    
    if(category){
        
        const products=await Product.find({ category: category._id});
        if(products.length>0){
            res.status(200).json({
                products,
                categoryName:category.name,
                priceRange: {
                  under5k: 5000,
                  under10k: 10000,
                  under15k: 15000,
                  under20k: 20000,
                  under30k: 30000,
                },
                productsByPrice: {
                    under5k: products.filter((product) => product.price <= 5000),
                    under10k: products.filter(
                      (product) => product.price > 5000 && product.price <= 10000
                    ),
                    under15k: products.filter(
                      (product) => product.price > 10000 && product.price <= 15000
                    ),
                    under20k: products.filter(
                      (product) => product.price > 15000 && product.price <= 20000
                    ),
                    under30k: products.filter(
                      (product) => product.price > 20000 && product.price <= 30000
                    ),
                  },
            });
        }
    }
    
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error});
    }
}

module.exports.getProductDetailsById = async(req, res) => {
  const { productId } = req.params;
  try{
    if (productId) {
      const product = await Product.findOne({ _id: productId });
      if(product){
        res.status(200).json({ product });
      }
    }
    else {
      return res.status(400).json({ error: "Params required" });
    }
  }
  catch(error){
    console.log(error.message);
    res.status(400).json({error});
  }
}

// new update
module.exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

module.exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};