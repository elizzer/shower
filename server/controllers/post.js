const Post = require('../model/post');
const{validationResult}= require("express-validator")

const {savePost}= require('./user');

exports.createPost=(req,res)=>{
   
    const error = validationResult(req).errors;
    if(error.length){
        console.log('[+]Validation error from post ',error);
        return res.status(400).json({code:0,msg:error[0].msg})
    }
    const newPost = new Post(req.body);
    newPost.creator=req.id;
    if(!savePost(req.id,newPost._id)){
        newPost.save((err,post)=>{
            if(err||!post){
                return res.status(400).json({code:0,msg:"Post cannot be saved, try again!"});
            }
            console.log('[+]Post created=> ',post);
            return res.status(200).json({code:1,msg:"Post created successfully!"});

        });
    }
    
   
}

exports.byId=(req,res,next,id)=>{
    req.id=id;
    next()
}
