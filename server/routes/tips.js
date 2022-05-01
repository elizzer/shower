const express = require('express');
const router = express.Router()

const { requiredSignin } = require('../controllers/auth');
const {addTip,replayTip} = require('../controllers/tips');
const {byUserId,byPostId,byTipId} = require('../controllers/utill')

router.post('/:userid/:postid',requiredSignin,addTip);
router.post('/:userid/:postid/:tipid',requiredSignin,replayTip);

router.param('userid',byUserId);
router.param('postid',byPostId);
router.param('tipid',byTipId);

module.exports=router;