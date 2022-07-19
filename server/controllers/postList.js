const Post = require('../model/post');
const User = require('../model/user')

exports.latestPost=(req,res)=>{
    console.log('[+]request for latest post');
    Post.find({}).limit('5').sort([['createdAt','desc']]).exec((err,posts)=>{
        if(err||!posts){
            return res.status(400).json({code:0,msg:"posts fetch failed"})
        }
        res.status(200).json({code:1,msg:"post fetch success",post:posts})
    })

}

exports.userPosts=(req,res)=>{
    User.findById(req.userId,(err,user)=>{
        if(err||!user){
            return res.status(400).json({code:0,msg:"posts fetch failed"})
        }
        user.populate('post').then(()=>
            res.status(200).json({code:1,msg:"post fetch success",post:user.post})
        )
    })
 
}

exports.hashTags=(req,res)=>{
    console.log('[+]Hastags requested',req.body.hashTags);
    Post.find({hashTags:{"$in":req.body.hashTags}},(err,data)=>{
        if(err||!data){
            return res.json({code:0,msg:"no post on the given hashtags"})
        }
        console.log('[+]Post ',data)
        return res.json({code:1,msg:"post fetch success",post:data})
       
    })
}