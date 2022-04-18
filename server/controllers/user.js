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