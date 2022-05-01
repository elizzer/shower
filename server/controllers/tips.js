const Tips= require('../model/tips');
const {saveTip} = require('../controllers/post')

exports.addTip=(req,res)=>{

    const tip = new Tips(req.body)
    tip.creator=req.userId;
    tip.post=req.postId;
    tip.save((err,data)=>{
        if(err||!data){
            return res.status(400).json({code:0,msg:"tip cannot be saved, try again!"});
        }
        console.log('[+]New tip',tip);
        return res.status(200).json({code:1,msg:"tip saved"});
    })

}

exports.replayTip=(req,res)=>{
    console.log('[+]Tip replay',req.body);
    const tip = new Tips(req.body);
    tip.creator=req.userId;
    tip.post=req.postId;
    Tips.findById(req.tipId,(err,data)=>{
        if(err||!data){
            return res.status(400).json({code:0,msg:"Tip cannot be saved"})
        }
        data.replays.push(tip._id);
        data.save().then(tip.save((err,t)=>{
            console.log('[+]tip replay saved')
            return res.status(400).json({code:0,msg:"Tip saved"})
        }));

    })
}
