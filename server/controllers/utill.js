exports.byUserId=(req,res,next,id)=>{
    req.userId=id;
    next()
}

exports.byPostId=(req,res,next,id)=>{
    req.postId=id;
    next()
}

exports.byTipId=(req,res,next,id)=>{
    req.tipId=id;
    next();
}