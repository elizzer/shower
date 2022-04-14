const {check, validationResult}= require("express-validator");

exports.login=[
    check("userName").notEmpty().withMessage("User name cannot be empty").isLength({min:5,max:32}).withMessage("The username must be have charactes between 5 and 32"),
    check("password").notEmpty().withMessage("Password fiels can't be empty").isLength({min:5,max:32}).withMessage("The password must be have charactes between 5 and 32"),
    check("email").isEmail().withMessage("Enter a valid email addrere"),
]

exports.signIn=[
    check("userName").notEmpty().withMessage("User name cannot be empty"),
    check("password").notEmpty().withMessage("Password fiels can't be empty")
]