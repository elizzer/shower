const express = require('express');
const { requiredSignin } = require('../controllers/auth');
const router = express.Router();

const {byUserId} = require('../controllers/utill');
const {followUser,updateUser}= require('../controllers/user')

router.post('/follow/:userid',requiredSignin,followUser);
router.post('/update/:userid',requiredSignin,updateUser);

router.param('userid',byUserId);

module.exports=router;