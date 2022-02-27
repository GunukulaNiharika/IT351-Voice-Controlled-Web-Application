const { check, validationResult } = require('express-validator');

exports.validateUserRegister=[
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName  is required'),
    check('username').isLength({min: 8,}).withMessage('Please enter a username with 8 or more characters'),
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password')
    .isLength({min: 6,}).withMessage('Please enter a password with 6 or more characters'),
]

exports.validateUserLogin=[
    // Validation for email and password
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password')
    .isLength({min: 6,}).withMessage('Please enter a password with 6 or more characters'),
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}