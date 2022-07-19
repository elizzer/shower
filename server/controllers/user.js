const User = require('../model/user')

exports.savePost=(creatorId,PostId)=>{

    User.findById(creatorId,(err,user)=>{
        user.post.push(PostId);
        console.log('[+] Post added to the user',user);
        user.save().then((err,user)=>{
            if(err||!user){
                return 0;
            }
            return 1;
        });
    })
    return;

}

exports.followUser=(req,res)=>{
    if(req.userId==req.body.userId){
        return res.status(400).json({code:0,msg:"this aciton is inapropriate"});
    }
    console.log('[+]User ',req.userId,' follows ',req.body.userId)
    User.findById(req.userId,(err,user)=>{
        if(err||!user){
            return res.status(400).json({code:0,msg:"User cannot perform this action"});
        }
        if(user.following.every(e=>e!=req.body.userId)){
            user.following.push(req.body.userId);
            user.save().then(()=>{
                User.findById(req.body.userId,(err,data)=>{
                    if(err||!data){
                        return res.status(400).json({code:0,msg:"User cannot perform this action"});
                    }
                    data.followers.push(req.userId);
                    data.save().then(()=>{
                        return res.status(200).json({code:1,msg:"User followed"});
                    })
                })
            })
            return;
        }
        user.following=user.following.filter(e=>e!=req.body.userId);
        user.save().then(()=>{
            User.findById(req.body.userId,(err,data)=>{
                if(err||!data){
                    return res.status(400).json({code:0,msg:"User cannot perform this action"});
                }
                data.followers=data.followers.filter(e=>e!=req.userId);
                data.save().then(()=>{
                    return res.status(200).json({code:1,msg:"User unfollowed"});
                })
            })
        })


    })
}

exports.updateUser=(req,res)=>{
    findById(req.userId,(err,user)=>{
        if(err||!user){
            console.log('[+] Unable to find the user for updation');
            return res.json({code:0,msg:"User not authorized"})
        }
        console.log('[+]Update user ',user)
    })
}