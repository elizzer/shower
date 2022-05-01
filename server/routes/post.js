const express = require("express");
const router = express.Router();

const {post} = require('../validator/post')
const {createPost,likePost}= require("../controllers/post");
const {byUserId,byPostId}= require('../controllers/utill');
const{requiredSignin} = require("../controllers/auth")

router.post('/:userid',post,requiredSignin,createPost);

router.post('/like/:userid/:postid',requiredSignin,likePost)

router.param('userid',byUserId);
router.param('postid',byPostId);

module.exports=router;