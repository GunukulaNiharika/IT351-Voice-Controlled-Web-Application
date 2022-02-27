const User = require('../Models/user');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken'); // to generate token
const gravatar = require('gravatar'); // get user image by email


module.exports.checkUser= async (req,res)=> {
    try{
        const user=await User.findById(req.user.id).select('-password')
        res.status(200).json(user)
    }
    catch(error){
        console.log(error.message);
        res.status(400).send('Server error');
    }
}

module.exports.signout = (req, res) => {
    const token = req.cookies.jwt; 
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({
      message: "Signout successfully...!",
    });
  };
module.exports.signin_post = async (req,res) =>{

    const { email,password } = req.body;
    try{
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                errors:[{
                    message: 'Invalid credentials',
                }],
            });
        }
       
        const isMatch= await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.status(400).json({
                errors: [{
                  message: 'Invalid Password'
                }]
              })
        }
        const payload = {
            user: {
              id: user.id,
              role: user.role,
            }
        }
        
        jwt.sign( payload, process.env.jwt_secret,{ expiresIn: 360000,},(err,token)=>{
            if(err) throw err;
            const { _id, firstName, lastName, username, email,avatar, fullName } = user;
            res.status(200).json({
                token,
                user: { _id, firstName, lastName, username, email, avatar, fullName }
            });
        });
    }
    catch(error){
        console.log(error.message);
        res.status(400).send('Server error');
    }

}

module.exports.signup_post = async (req,res) =>{

    const { firstName, lastName, username, email, password } = req.body;
    try{
        let user= await User.findOne({email});
        if(user){
            return res.status(400).json({
                errors:[{
                    message: 'User already exists',
                }],
            });
        }
        const avatar=gravatar.url(email,{
            s: '200', // Size
            r: 'pg', // Rate,
            d: 'mm',
        });
        user = new User({
            firstName,
            lastName,
            username,
            email,
            password,
            avatar,
        });

        const salt = await bcrypt.genSalt(10); // generate salt contains 10
        // save password
        user.password = await bcrypt.hash(password, salt); // use user password and salt to hash password
        //save user in databasw
        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        res.status(201).json({message: "User created Successfully..!",});

    }
    catch(error){
        console.log(error.message);
        res.status(400).send('Server error');
    }

}