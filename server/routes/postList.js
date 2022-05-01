const express = require('express');
const router = express.Router();

const { requiredSignin } = require('../controllers/auth');
const {latestPost,userPosts}= require('../controllers/postList');
const {byUserId}= require('../controllers/utill');

router.get('/latest',latestPost);
router.get('/userposts/:userid',requiredSignin,userPosts);

router.param('userid',byUserId);

module.exports=router;