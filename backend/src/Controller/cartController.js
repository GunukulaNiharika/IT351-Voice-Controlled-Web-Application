const Cart = require("../models/Cart");
function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

module.exports.addItemToCart=  (req,res) =>{
    try{
        
        Cart.findOne({user: req.user.id}, async(err,cart)=>{
            if(err){
                res.status(400).json({error});
            }
            if(cart){

              let promiseArray = [];
              req.body.cartItems.forEach((cartItem) => {
                const product= cartItem.product;
                const item = cart.cartItems.find((c)=>c.product== product);
                let condition,update;
                if(item){
                  condition ={"user": req.user.id, "cartItems.product":product};
                  update={
                      "$set":{
                           "cartItems.$": cartItem,
                          // {
                          //     ...req.body.cartItems,
                          // quantity:item.quantity+req.body.cartItems.quantity
                          // }
                      },
                  };
              } else{
                condition ={user: req.user.id};
                update={
                    "$push":{
                        "cartItems": cartItem,
                    },
                };
               }
               promiseArray.push(runUpdate(condition, update));

              });
              Promise.all(promiseArray)
              .then((response) => res.status(201).json({response}))
              .catch((error) => res.status(400).json({error}));
                
                // await Cart.findOneAndUpdate(condition,update);
                // res.status(201).json({cart});
            }
            else{
                const cart= new Cart({
                    user: req.user.id,
                    cartItems: req.body.cartItems
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

module.exports.getCartItems = (req, res) => {
  Cart.findOne({ createdBy: req.user._id })
  .populate("cartItems.product", "_id name price productPictures")
  .exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      let cartItems = {};
      cart.cartItems.forEach((item, index) => {
        cartItems[item.product._id.toString()] = {
          _id: item.product._id.toString(),
          name: item.product.name,
          img: item.product.productPictures[0].img,
          price: item.product.price,
          qty: item.quantity,
        };
      });
      res.status(200).json({ cartItems });
    }
  });
    //}
  };
  
  // new update remove cart items
  module.exports.removeCartItems = (req, res) => {
    const { productId } = req.body.payload;
    if (productId) {
      Cart.updateOne(
        { user: req.user.id },
        {
          $pull: {
            cartItems: {
              product: productId,
            },
          },
        }
      ).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    }
  };


