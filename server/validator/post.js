const {check}= require("express-validator");

exports.post=[
    check("title").notEmpty().withMessage("Title for a shower is important"),
    check("description").notEmpty().withMessage("Description for a shower should not be empty")
]