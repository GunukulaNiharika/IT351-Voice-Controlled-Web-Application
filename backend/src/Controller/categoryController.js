const Category = require("../models/Category");
const slugify = require("slugify");
const shortId = require("shortid");

module.exports.addCategory_post= async(req,res)=>{
    const { name, parentId} =req.body;
    
    try{
        const slug=`${slugify(name)}-${shortId.generate()}`;
        const cat= new Category({
            name,
            slug,
            parentId,
        });
        if(req.file){
            cat.categoryImage=process.env.API+'/public/'+ req.file.filename;
        }
        await cat.save();
        res.status(201).json({cat});
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}

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
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            type: cat.type,
            categoryImage: cat.categoryImage,
            children: createCategory(categories,cat._id),
        });
    }
    return categoryList;
}

module.exports.getCategories_get = async (req,res)=>{
    try{
        const categories=await Category.find({});
        const categoryList=createCategory(categories);
        res.status(200).json({categoryList});
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}

module.exports.updateCategory_post = async (req,res) => {
    const {_id, name, parentId, type} = req.body;
    try{
    console.log(req.body);
    const updated_categories = [];
    if(name instanceof Array){
        for(let i=0;i<name.length;i++){
            const category = {
                name: name[i],
                type: type[i]
            }
            if(parentId[i] != ""){
                category.parentId =parentId[i];
            }

            const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new: true});
            updated_categories.push(updatedCategory);
           
        }
        return res.status(201).json({updated_categories});
    }
    else{
        const category = {name,type};
        if(parentId != ""){
            category.parentId =parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate({_id}, category, {new: true});
        return res.status(201).json({updatedCategory});
    }
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}

module.exports.deleteCategory_post = async(req,res) => {
    const {ids} = req.body.payload;
    
    try{
        const deleteCategories=[];
        for(let i=0;i<ids.length; i++){
            const deleteCategory = await Category.findOneAndDelete({_id: ids[i]._id});
            deleteCategories.push(deleteCategory);
        }
        if(deleteCategories.length == ids.length){
            res.status(200).json({message: "Categories deleted successfully..!"});
        }
        else{
            res.status(400).json({message:"Something Went Wrong"});
        }
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}