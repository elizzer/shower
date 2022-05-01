const express = require('express');
const { requiredSignin } = require('../controllers/auth');
const router = express.Router();

const {byUserId} = require('../controllers/utill');
const {followUser}= require('../controllers/user')

router.post('/follow/:userid',requiredSignin,followUser);

router.param('userid',byUserId);

module.exports=router;