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
    newPost.creator=req.userId;
    newPost.hashTags=splitHashtag(req.body.hashtags)
    if(!savePost(req.userId,newPost._id)){
        newPost.save((err,post)=>{
            if(err||!post){
                return res.status(400).json({code:0,msg:"Post cannot be saved, try again!"});
            }
            console.log('[+]Post created=> ',post);
            return res.status(200).json({code:1,msg:"Post created successfully!"});

        });
    }
    
   
}

exports.likePost=(req,res)=>{
    console.log('[+]Like post ',req.postId);
    Post.findById(req.postId).exec((err,post)=>{
        if(post.like.every((e)=>e!=req.userId)){
            post.like.push(req.userId);
            post.save((err,data)=>{
                res.status(400).json({code:1,msg:'User liked the post',post:data})

            });
        }
        else{
            post.like=post.like.filter((e)=>e!=req.userId)
            post.save((err,data)=>{
                console.log('[+]User unliked the post',post);
                res.status(400).json({code:1,msg:'User unliked the post',post:data})
            });
        }
        post.populate('like').then(()=>console.log('[+]The post',post));
        
    })
    
}

exports.saveTip=(tid,pid)=>{
    Post.findById(pid,(err,post)=>{
       post.tips.push(tid);
       post.save().then((err,post)=>{
           if(err||!post){
               return 0;
           }
           return 1;
       })
    })
    return;
}

exports.updatePost=(req,res)=>{
    console.log('[+]Update post request by the user ',req.userId);
    const error = validationResult(req).errors;
    if(error.length){
        console.log('[+]Validation error from post ',error);
        return res.status(400).json({code:0,msg:error[0].msg})
    }
    Post.findById(req.postId,(err,data)=>{
        if(err||!data){
            return res.json({code:0,msg:"Unable to find the post"})
        }
        console.log('[+] The new updated post', req.body)
        console.log('[+]The old version of the post',data)
        data.title=req.body.title
        data.description=req.body.description
        data.hashTags=splitHashtag(req.body.hashtag)
        data.save((err,data)=>{
            if(err||!data){
                console.log('[+]Unable to save the newer verion of the post')
                return res.json({code:0,msg:"Unable to save the newer version of the post"})
            }
            console.log('[+]Post updated sucessfully')
            return res.json({code:1,msg:"Post updated sucessfully"})
        })
    })
   
}

splitHashtag=(hashtag)=>{
    var array= hashtag.split('#')
    var filtred= array.filter((e)=>{
        return e!=''
    })
    console.log('[+] array of hashtags ',filtred)
    return filtred
}