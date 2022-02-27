const Page = require('../../Models/Page');

module.exports.createPage_post = async(req,res) => {
    const { banners, products } = req.files;
    try{
        if (banners && banners.length > 0) {
            req.body.banners = banners.map((banner, index) => ({
              img: `${process.env.API}/public/${banner.filename}`,
              navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
            }));
        }
          if (products && products.length > 0) {
            req.body.products = products.map((product, index) => ({
              img: `${process.env.API}/public/${product.filename}`,
              navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
        }));
    
    }

    
    const page = new Page(req.body);
    page.createdBy= req.user.id;

    let pagef = await Page.findOne({category: req.body.category});
    if(!pagef){
      
      await page.save();
      res.status(200).json({ body: req.body }) ;
    }
    Page.findOneAndUpdate({category: req.body.category}, req.body,(err,updatedPage)=>{
      if(err){
        return res.status(400).json({err})
      }
      if(updatedPage){
        return res.status(201).json({page: updatedPage});
      }

    })
   




   
    }
    catch(error){
      console.log(error);
    }
    
}

module.exports.getPage = async(req, res) => {
  const { category, type} =req.params;
  if(type == "page"){
  const page= await  Page.findOne({category: category});
    if(!page){
      return res.status(400).json({
        error: "Page not found"
      });
    }
    return res.status(200).json({page});
  }
}