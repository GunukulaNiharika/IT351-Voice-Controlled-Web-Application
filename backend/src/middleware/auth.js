const jwt = require('jsonwebtoken')
const { signout} = require('../Controller/admin/authController')
const multer = require('multer');
const shortid= require('shortid');
const path = require("path");

module.exports.requireSignIn = function (req, res, next) {
    // Get token from header 
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
        return res.status(401).json({
            message: 'No token, auth denied'
        })
    }

    // Verify token 
    
       jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
        if(err){
        if (err.message === 'jwt expired') {
            console.log('Whoops, your token has expired!');
        }
        
        if (err.message === 'invalid token') {
            console.log('That JWT is malformed!');
        }
    }
        
        else {
            console.log('Your JWT was successfully validated!');
             // set user id in req.user
            req.user = decoded.user;
        }
        //console.log(decoded);
        //req.user = decoded.user;
        
       })
       
        
        next();
}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  };
  
  exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
    //   if (req.user.role !== "super-admin") {
        return res.status(400).json({ message: "Admin access denied" });
    //   }
    }
    next();
  };




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
});
exports.upload = multer({storage})