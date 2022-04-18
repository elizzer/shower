const User = require("../model/user");
const {validationResult, Result}= require('express-validator');
const bycrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { post } = require("../validator/post");

exports.createUser =(req,res)=>{
   const newUser = new User(req.body);
   console.log(newUser);
   const error= validationResult(req).errors;
   if(error.length){
        res.status(422).json({code:0,msg:error[0].msg})
       return
   }
   
   bycrypt.genSalt(10,function(err,salt){
       bycrypt.hash(req.body.password,salt,function(err,hash){
          newUser.hashedPassword=hash;
          newUser.save((err,user)=>{
            if(err||!user){
                console.log("[+]",err.message);
                if(err.code==11000){
                    res.status(400).json({code:0,msg:"Alredy found",value:err.keyValue})
                    return
                 }
             }
             res.status(200).json({code:1,user:user})
        });
       })
   })

   
}

exports.signin=(req,res)=>{
    const errors = validationResult(req).errors;
    if(errors.length){
        console.log('[+]user signin valication error=>',errors)
        return res.status(422).json({code:0,msg:errors[0].msg})
    }
    User.findOne({userName:req.body.userName},(err,data)=>{
        if(err||!data){
           return res.status(400).json({code:0,msg:"Credentials does not match"})
        }
        bycrypt.compare(req.body.password,data.hashedPassword,(err,result)=>{
            if(result){
                console.log('[+]user password matched',data._id);
                const token = JWT.sign({id:data._id},process.env.SECRET_KEY);
                data.hashedPassword=undefined
                return res.status(200).json({token:token,user:data})
            }
            else{
                console.log('[+]Password does not match');
                return res.status(400).json({code:0,msg:"Credentials does not match"});
            }
        })
    })
}

exports.requiredSignin=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    User.findById(req.id,(err,user)=>{
        if(err||!user){
            return res.status(400).json({code:0,msg:"User not singed in"});
        }
        console.log('[+]User',user)
        JWT.verify(token,process.env.SECRET_KEY,(err,data)=>{
            if(err||!data){
                return res.status(400).json({code:0,msg:"User not singed in"});
            }
            if(String(user._id)!==data.id){
                console.log('[+]User not authenticated');
                return res.status(400).json({code:0,msg:"User not singed in"});
            }

            next()
    })
    })
    
   
}