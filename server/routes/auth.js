const express = require("express");
const router = express.Router();
const {createUser,signin} = require("../controllers/auth")
const {check}= require("express-validator")
const {login,signIn} = require("../validator/user")


router.post('/login',login,createUser)


router.post('/signin',signIn,signin)

module.exports=router;