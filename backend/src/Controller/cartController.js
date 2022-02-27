const Cart = require("../models/Cart");

module.exports.addItemToCart=  (req,res) =>{
    try{
        
        Cart.findOne({user: req.user.id}, async(err,cart)=>{
            if(err){
                res.status(400).json({error});
            }
            if(cart){
                const product=req.body.cartItems.product;
                const item = cart.cartItems.find((c)=>c.product== product);
                let condition,update;
                if(item){
                    condition ={"user": req.user.id, "cartItems.product":product};
                    update={
                        "$set":{
                            "cartItems.$": {
                                ...req.body.cartItems,
                            quantity:item.quantity+req.body.cartItems.quantity
                            }
                        }
                    };
                }
                else{
                    condition ={user: req.user.id};
                    update={
                        "$push":{
                            "cartItems": req.body.cartItems
                        }
                    };
                   
                }
                await Cart.findOneAndUpdate(condition,update);
                res.status(201).json({cart});
            }
            else{
                const cart= new Cart({
                    user: req.user.id,
                    cartItems: [req.body.cartItems]
                });
        
                await cart.save();
                res.status(201).json({cart});
            }
        });

        
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}   