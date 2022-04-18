const express = require("express");
const router = express.Router();

const {post} = require('../validator/post')
const {createPost,byId}= require("../controllers/post")
const{requiredSignin} = require("../controllers/auth")

router.post('/:id',post,requiredSignin,createPost)

router.param('id',byId);

module.exports=router;