const Category = require('../../models/Category');
const Product = require('../../models/product');
function createCategory(categories, parentId=null){
    const categoryList=[];
    let category;
    if(parentId==null){
        category=categories.filter((cat)=>cat.parentId==undefined);
    }
    else{
        category=categories.filter((cat)=>cat.parentId==parentId);
    }
    for(let cat of category){
        categoryList.push({
            _id:cat._id,
            name:cat.name,
            slug:cat.slug,
            parentId:cat.parentId,
            type:cat.type,
            children:createCategory(categories,cat._id),
        });
    }
    return categoryList;
}

module.exports.initialData_post = async (req,res) =>{
    try{
    const categories = await Category.find({});
    const products= await Product.find({})
                                 .select('_id name price quantity slug description productPictures category')
                                 .populate({path: 'category', select: '_id name'});
    res.status(200).json({
        categories:createCategory(categories),
        products
    });
    }
    catch(error){
        res.status(400).json({error});
    }
}